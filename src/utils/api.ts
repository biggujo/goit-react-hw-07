import axios, { AxiosResponse } from 'axios';
import { Contact } from '../interfaces';

axios.defaults.baseURL = 'https://65393c73e3b530c8d9e8275e.mockapi.io/';

const fetchContacts = async () => {
  const response: AxiosResponse = await axios.get('/contacts');
  return response.data;
};

const addContact = async ({
                            name,
                            phone,
                          }: Contact) => {
  const response: AxiosResponse = await axios.post('/contacts', {
    name,
    phone,
  });
  return response.data;
};

const deleteContactById = async (id: string) => {
  const response: AxiosResponse = await axios.delete(`/contacts/${id}`);
  return response.data;
};

const api = {
  fetchContacts,
  addContact,
  deleteContactById,
};

export default api;
