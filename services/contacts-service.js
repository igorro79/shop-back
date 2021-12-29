const { Contacts } = require('../services/schemas/contacts-schema');
const { NotFound } = require('../helpers/errors');

const getContacts = async (owner, page, limit, favorite) => {
  const skipValue = (page - 1) * 20;
  const favoriteFilter = favorite ? { $eq: favorite } : { $nin: null };
  console.log(page);
  return await Contacts.find({ owner, favorite: { ...favoriteFilter } })
    .skip(skipValue)
    .limit(20);
};

const getContactById = async (contactId, owner) => {
  const contact = await Contacts.findOne({ _id: contactId, owner });
  if (!contact) {
    throw new NotFound(`Contact with Id ${contactId} not found!`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contacts({ name, email, phone, favorite, owner });
  const saved = await contact.save();
  return saved;
};

const updateContact = async (
  contactId,
  { name, email, phone, favorite },
  owner
) => {
  const result = await Contacts.findOneAndUpdate(
    {
      _id: contactId,
    },
    { name, email, phone, favorite, owner },
    { new: true }
  );
  return result;
};

const updateFavoriteContact = async (contactId, { favorite }, owner) => {
  const result = await Contacts.findOneAndUpdate(
    {
      _id: contactId,
      owner,
    },
    { favorite },
    { new: true }
  );

  return result;
};

const removeContact = async (contactId, owner) => {
  const removed = await Contacts.findOneAndRemove({ _id: contactId, owner });
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
