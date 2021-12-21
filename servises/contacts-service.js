const res = require('express/lib/response');
const { Contacts } = require('../servises/schemas/contacts-schema');

const getContacts = async () => {
  return await Contacts.find();
};

const getContactById = async (id) => {
  const contact = await Contacts.findById(id);
  if (!contact) {
    return res.status(200).json(`Contact with ${id} not found!`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contacts({ name, email, phone, favorite });
  await contact.save();
};

const updateContact = async (id, { name, email, phone, favorite }) => {
  const result = await Contacts.findByIdAndUpdate(
    id,
    {
      $set: { name, email, phone, favorite },
    },
    { new: true }
  );
  return result;
};

const updateFavoriteContact = async (id, { favorite }) => {
  const result = await Contacts.findByIdAndUpdate(
    id,
    {
      $set: { favorite },
    },
    { new: true }
  );
  return result;
};

const removeContact = async (id) => {
  await Contacts.findOneAndRemove(id);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContact,
  removeContact,
};
