const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContact,
  removeContact,
} = require('../servises/contacts-service');

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
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const updatedContact = await updateContact(id, req.body);
  res.json(updatedContact);
};

const updateStatusContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const updatedContact = await updateFavoriteContact(id, req.body);
  res.json(updatedContact);
};
const removeContactController = async (req, res, next) => {
  const id = req.params.contactId;
  await removeContact(id);
  res.json({ nessage: 'Contact removed successfully' });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
