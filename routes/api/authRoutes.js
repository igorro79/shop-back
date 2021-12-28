const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  userValidationJoi,
  userSubscriptionValidationJoi,
} = require('../../middleware/user-validation');

const { authMiddleware } = require('../../middleware/authMiddleware');

const {
  userSignupController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionController,
} = require('../../controllers/authController');

router.post('/signup', userValidationJoi, asyncWrapper(userSignupController));
router.post('/login', userValidationJoi, asyncWrapper(userLoginController));
router.get('/current', authMiddleware, asyncWrapper(userCurrentController));
router.post('/logout', authMiddleware, asyncWrapper(userLogoutController));
router.patch(
  '/',
  authMiddleware,
  userSubscriptionValidationJoi,
  asyncWrapper(userSubscriptionController)
);

module.exports = router;
