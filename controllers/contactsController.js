const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContact,
  removeContact,
} = require('../servises/contacts-service');

const {
  validationContact,
  validationFavorite,
} = require('../middleware/contacts-validation');

const getContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
};

const addContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await validationContact.validateAsync({
      username: name,
      email: email,
      phone: phone,
    });
    const contact = await addContact(result);
    res.json(contact);
  } catch (error) {
    const [validationMessage] = error.details;
    res.status(400).json({ message: validationMessage.message });
  }
};

const updateContactController = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'missing fields' });
    }

    const id = req.params.contactId;
    const { name, email, phone, favorite } = req.body;
    const result = await validationContact.validateAsync({
      username: name,
      email: email,
      phone: phone,
      favorite: favorite,
    });
    const updatedContact = await updateContact(id, { ...result });

    res.json(updatedContact);
  } catch (error) {
    const [validationMessage] = error.details;
    res.status(400).json({ message: validationMessage.message });
  }
};

const updateStatusContactController = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'missing fields' });
    }

    const id = req.params.contactId;
    const { favorite } = req.body;
    const result = await validationFavorite.validateAsync({
      favorite: favorite,
    });
    if (!result) {
      res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await updateFavoriteContact(id, { favorite });

    res.json(updatedContact);
  } catch (error) {
    const [validationMessage] = error.details;
    res.status(400).json({ message: validationMessage.message });
  }
};
const removeContactController = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
