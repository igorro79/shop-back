const { Users } = require('./schemas/users-schema');
const {
  AuthError,
  Conflict,
  NotFound,
  WrongParametersError,
} = require('../helpers/errors');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = async (email, password, avatarURL) => {
  const passwordHash = await bcrypt.hash(password, saltRounds);
  if (await Users.findOne({ email })) {
    throw new Conflict('User already exist!');
  }

  const verificationToken = v4();
  const user = await Users.create({
    email,
    password: passwordHash,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: `${user.email}`, // Change to your recipient
    from: `${process.env.EMAIL_SEND_FROM}`, // Change to your verified sender
    subject: 'Email verification',
    text: `Confirm your email http://localhost:3000/users/verify/${verificationToken}`,
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Confirm</a> your email`,
  };

  sgMail.send(msg).catch((e) => console.error(e));
};

const registerConfirmation = async (verificationToken) => {
  if (!verificationToken) {
    throw new NotFound('User not found');
  }
  const user = await Users.findOne({ verificationToken });
  if (!user) {
    throw new NotFound('email not found');
  }

  user.verificationToken = 'null';
  user.verify = true;
  user.save();

  const msg = {
    to: `${user.email}`, // Change to your recipient
    from: `${process.env.EMAIL_SEND_FROM}`, // Change to your verified sender
    subject: 'Thank you for registration!',
    text: `Thank you for registration!`,
    html: `Thank you for registration!}`,
  };
  sgMail.send(msg).catch((e) => console.error(e));
};
const registerConfirmationAgain = async ({ email }) => {
  if (!email) {
    throw new WrongParametersError('missing required field email');
  }
  const user = await Users.findOne({ email });
  if (!user) {
    throw new NotFound('email not found');
  }
  if (user.verify) {
    throw new WrongParametersError('Verification has already been passed');
  }

  const msg = {
    to: `${user.email}`,
    from: `${process.env.EMAIL_SEND_FROM}`,
    subject: 'Email verification',
    text: `Confirm your email http://localhost:3000/users/verify/${user.verificationToken}`,
    html: `<a href="http://localhost:3000/users/verify/${user.verificationToken}">Confirm</a> your email`,
  };

  sgMail.send(msg).catch((e) => console.error(e));
};

const login = async (email, password) => {
  const userExist = await Users.findOne({ email });

  if (!userExist) {
    throw new AuthError('Email or password is wrong');
  }
  if (userExist.verify !== true) {
    throw new AuthError('Email is not verified');
  }
  if (!(await bcrypt.compare(password, userExist.password))) {
    throw new AuthError('Email or password is wrong');
  }
  const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET);
  await Users.findOneAndUpdate({ email }, { token });

  const { subscription } = userExist;
  const user = { email, subscription };
  return { token, user };
};

const current = async (token) => {
  const currentUser = await Users.findOne({ token }, 'email subscription');
  return currentUser;
};

const logout = async (user) => {
  const { _id: userId } = user;
  await Users.findOneAndUpdate({ _id: userId }, { token: null });
};
const subscription = async (user, { subscription: newSubscription }) => {
  const { _id: userId } = user;
  await Users.findOneAndUpdate(
    { _id: userId },
    { subscription: newSubscription }
  );
};
const userAvatar = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await Users.findOneAndUpdate(
    { _id: userId },
    { avatarURL: req.avatarURL },
    { new: true, projection: { avatarURL: true } }
  );
  return result;
};

module.exports = {
  register,
  registerConfirmation,
  registerConfirmationAgain,
  login,
  logout,
  current,
  subscription,
  userAvatar,
};
