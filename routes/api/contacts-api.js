const express = require('express');
const router = express.Router();
// const { validationSchema } = require('../../middleware/contacts-validation');
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
} = require('../../controllers/contactsController');

router.get('/', getContactsController);
router.post('/', addContactController);
router.get('/:contactId', getContactByIdController);
router.put('/:contactId', updateContactController);
router.patch('/:contactId/favorite', updateStatusContactController);
router.delete('/:contactId', removeContactController);

module.exports = router;
