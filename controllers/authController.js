const fs = require('fs').promises;
const {
  register,
  login,
  logout,
  current,
  subscription,
  userAvatar,
} = require('../services/users-services');

const gravatar = require('gravatar');

const userSignupController = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { protocol: 'http', s: '100' });
  const user = await register(email, password, avatarURL);
  res.status(200).json({ user });
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  res.json({ ...result });
};

const userCurrentController = async (req, res) => {
  const result = await current(req.token);
  res.json(result);
};

const userLogoutController = async (req, res) => {
  await logout(req.user);
  res.sendStatus(204);
};
const userSubscriptionController = async (req, res) => {
  await subscription(req.user, req.body);
  res.sendStatus(200);
};
const userAvatarController = async (req, res) => {
  await fs.unlink(req.file.path);
  const result = await userAvatar(req, res);

  res.json(result);
};
module.exports = {
  userSignupController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionController,
  userAvatarController,
};
