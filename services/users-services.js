const { Users } = require('./schemas/users-schema');
const { AuthError, Conflict } = require('../helpers/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (email, password) => {
  if (await Users.findOne({ email })) {
    throw new Conflict('User already exist!');
  }
  const user = new Users({
    email,
    password,
  });
  await user.save();
  const { subscription } = user;
  return {
    email,
    subscription,
  };
};

const login = async (email, password) => {
  const userExist = await Users.findOne({ email });
  if (!userExist) {
    throw new AuthError('Email or password is wrong');
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

module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
};
