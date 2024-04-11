import axios from 'axios';

axios.defaults.baseURL = 'https://65393c73e3b530c8d9e8275e.mockapi.io/';

const fetchContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

const addContact = async ({
  name,
  phone,
}) => {
  const response = await axios.post('/contacts', {
    name,
    phone,
  });
  return response.data;
};

const deleteContact = async (id) => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
};

const api = {
  fetchContacts,
  addContact,
  deleteContact,
};

export default api;
