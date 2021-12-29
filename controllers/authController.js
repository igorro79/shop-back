const {
  register,
  login,
  logout,
  current,
  subscription,
} = require('../services/users-services');

const userSignupController = async (req, res) => {
  const { email, password } = req.body;
  const user = await register(email, password);
  res.status(201).json({ user });
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
module.exports = {
  userSignupController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionController,
};
