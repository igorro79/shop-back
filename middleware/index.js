const {
  contactValidationJoi,
  patchFavoriteValidationJoi,
} = require('./contacts-validation');

const { authMiddleware } = require('./authMiddleware');

const {
  userValidationJoi,
  userSubscriptionValidationJoi,
} = require('./user-validation');

const { avatarUpdateMiddleware } = require('./avatar-udate-middleware');
const { avatarNormalize } = require('./avatar-jimp-middleware');

module.exports = {
  contactValidationJoi,
  patchFavoriteValidationJoi,
  userValidationJoi,
  userSubscriptionValidationJoi,
  authMiddleware,
  avatarUpdateMiddleware,
  avatarNormalize,
};
