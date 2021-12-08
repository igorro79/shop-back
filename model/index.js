/* eslint-disable no-useless-catch */
const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

// console.log(contactsPath);
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(
      (contact) => contact.id.toString() === contactId
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id.toString() === id);
    if (idx === -1) {
      return null;
    }
    const removed = contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removed;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const id = nanoid();
    const newItem = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(newItem);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newItem;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, data) => {
  try {
    const list = await listContacts();
    const idx = list.findIndex((contact) => contact.id.toString() === id);

    list[idx] = { ...data, id };

    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return list[idx];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
