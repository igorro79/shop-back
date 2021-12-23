const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  contactValidationJoi,
  patchFavoriteValidationJoi,
} = require('../../middleware/contacts-validation');

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
} = require('../../controllers/contactsController');

router.get('/', asyncWrapper(getContactsController));
router.post('/', contactValidationJoi, asyncWrapper(addContactController));
router.get('/:contactId', asyncWrapper(getContactByIdController));
router.put(
  '/:contactId',
  contactValidationJoi,
  asyncWrapper(updateContactController)
);
router.patch(
  '/:contactId/favorite',
  patchFavoriteValidationJoi,
  asyncWrapper(updateStatusContactController)
);
router.delete('/:contactId', asyncWrapper(removeContactController));

module.exports = router;
