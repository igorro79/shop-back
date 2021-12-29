const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContact,
  removeContact,
} = require('../services/contacts-service');

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 20, favorite = false } = req.query;
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit, 10);

  const contacts = await getContacts(
    owner,
    parseInt(page, 10),
    limit,
    favorite
  );
  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { _id: owner } = req.user;

  const contactId = req.params.contactId;
  const contact = await getContactById(contactId, owner);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;

  const contact = await addContact(req.body, owner);
  res.status(201).json(contact);
};

const updateContactController = async (req, res) => {
  const { _id: owner } = req.user;

  const contactId = req.params.contactId;

  const updatedContact = await updateContact(contactId, req.body, owner);
  res.json(updatedContact);
};

const updateStatusContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: owner } = req.user;

  const updatedContact = await updateFavoriteContact(
    contactId,
    req.body,
    owner
  );
  res.json(updatedContact);
};
const removeContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: owner } = req.user;

  await removeContact(contactId, owner);
  res.json({ message: 'Contact removed successfully' });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
