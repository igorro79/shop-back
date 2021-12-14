const express = require('express');
const router = express.Router();
const { validationSchema } = require('./contacts-validation');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model');

router
  .get('/', async (req, res, next) => {
    try {
      const response = await listContacts();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'database error' });
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;

      const result = await validationSchema.validateAsync({
        username: name,
        email: email,
        phone: phone,
      });

      const response = await addContact(name, email, phone);
      res.json(response);
      console.log(result);
    } catch (error) {
      const [validationMessage] = error.details;
      res.status(400).json({ message: validationMessage.message });
    }
  });

router
  .get('/:contactId', async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const response = await getContactById(id);

      if (response === null) {
        res.status(404).json({ message: 'Not found' });
      }
    } catch (error) {
      console.log(error);
    }
  })
  .delete('/:contactId', async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const response = await removeContact(id);
      if (response === null) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.status(200).json({ message: 'contact deleted', response });
      }
    } catch (error) {
      console.log(error);
    }
  })
  .put('/:contactId', async (req, res, next) => {
    try {
      if (!req.body) {
        res.status(400).json({ message: 'missing fields' });
      }
      const id = req.params.contactId;
      const { name, email, phone } = req.body;

      const result = await validationSchema.validateAsync({
        username: name,
        email: email,
        phone: phone,
      });

      const response = await updateContact(id, result);
      if (response === null) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.json(response);
      }
    } catch (error) {
      const [validationMessage] = error.details;
      res.status(400).json({ message: validationMessage.message });
    }
  });

module.exports = router;
