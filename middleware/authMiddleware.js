const jwt = require('jsonwebtoken');
const { Users } = require('../services/schemas/users-schema');

const { AuthError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AuthError('Not authorized'));
  }

  const [tokenType, token] = req.headers.authorization.split(' ');

  if (!token) {
    throw new AuthError('need token');
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;

    const currentUser = await Users.findOne({ _id: user._id });
    if (!currentUser || token !== currentUser.token) {
      throw new AuthError('Not authorized');
    }
    next();
  } catch (error) {
    next(new AuthError('Invalid token'));
  }
};
module.exports = {
  authMiddleware,
};
