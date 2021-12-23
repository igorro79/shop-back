const { Contacts } = require('../servises/schemas/contacts-schema');
const { WrongParametersError } = require('../helpers/errors');
const getContacts = async () => {
  return await Contacts.find();
};

const getContactById = async (id) => {
  const contact = await Contacts.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Contact with id ${id} not found!`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contacts({ name, email, phone, favorite });
  const saved = await contact.save();
  return saved;
};

const updateContact = async (id, { name, email, phone, favorite }) => {
  const result = await Contacts.findByIdAndUpdate(
    id,
    { name, email, phone, favorite },
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
  const removed = await Contacts.findByIdAndRemove(id);
  return removed;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContact,
  removeContact,
};
