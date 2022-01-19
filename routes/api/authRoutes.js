const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/apiHelpers');

const {
  userValidationJoi,
  userSubscriptionValidationJoi,
  userSignupConfirmationAgainJoi,
  authMiddleware,
  avatarUpdateMiddleware,
  avatarNormalize,
} = require('../../middleware');

const {
  userSignupController,
  userSignupConfirmationController,
  userSignupConfirmationAgainController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionController,
  userAvatarController,
} = require('../../controllers/authController');

router.post('/signup', userValidationJoi, asyncWrapper(userSignupController));
router.get(
  '/verify/:verificationToken',
  asyncWrapper(userSignupConfirmationController)
);
router.post(
  '/verify',
  userSignupConfirmationAgainJoi,
  asyncWrapper(userSignupConfirmationAgainController)
);

router.post('/login', userValidationJoi, asyncWrapper(userLoginController));
router.get('/current', authMiddleware, asyncWrapper(userCurrentController));
router.post('/logout', authMiddleware, asyncWrapper(userLogoutController));
router.patch(
  '/avatars',
  authMiddleware,
  avatarUpdateMiddleware.single('avatar'),
  avatarNormalize,
  asyncWrapper(userAvatarController)
);

router.patch(
  '/',
  authMiddleware,
  userSubscriptionValidationJoi,
  asyncWrapper(userSubscriptionController)
);

module.exports = router;
