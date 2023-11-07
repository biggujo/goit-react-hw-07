import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Wrapper } from './App.styled';
import Section from '../Section';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import GlobalStyles from '../GlobalStyles';
import { nanoid } from 'nanoid';
import { useLocalStorage } from '../../hooks';

const LS_KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, [
    {
      id: 'id-1',
      name: 'Rosie Simpson',
      phone: '459-12-56',
    },
    {
      id: 'id-2',
      name: 'Hermione Kline',
      phone: '443-89-12',
    },
    {
      id: 'id-3',
      name: 'Eden Clements',
      phone: '645-17-79',
    },
    {
      id: 'id-4',
      name: 'Annie Copeland',
      phone: '227-91-26',
    },
  ]);

  const [filter, setFilter] = useState('');

  const handleFilterChange = ({
                                currentTarget: {
                                  value,
                                },
                              }) => {
    setFilter(value);
  };

  const handleContactDeleteById = (id) => {
    setContacts(prevState => prevState.filter(({ id: contactId }) => {
      return contactId !== id;
    }));
  };

  // Return true if success, otherwise return false
  const handleSubmit = (contact) => {
    return addContact(contact);
  };

  /**
   * Returns false if an error has occurred
   *
   * Possible errors:
   * 1. Empty name
   * 2. ContactItem duplicate
   * 3. Phone is empty
   * 4. Regular expression test has failed
   *
   * RegExp rules: 0-9, +, ', -
   */
  const addContact = ({
                        name,
                        phone,
                      }) => {
    if (!isNameValid()) {
      return false;
    }

    if (!isPhoneValid()) {
      return false;
    }

    // Add a non-empty unique contact
    setContacts(prevState => [
      {
        id: nanoid(),
        name,
        phone,
      },
      ...prevState,
    ]);

    return true;

    function isNameValid() {
      if (!name) {
        toast.error('Provide a name');
        return false;
      }

      if (contacts.find(({ name: contactName }) => contactName === name)) {
        toast.error('Choose a unique name');
        return false;
      }

      return true;
    }

    function isPhoneValid() {
      if (!phone) {
        toast.error('Provide a phone');
        return false;
      }

      const regExp = new RegExp('^[0-9 -\'+]+$');

      const isPhoneAValidNumber = regExp.test(phone);

      if (!isPhoneAValidNumber) {
        toast.error(
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +');
        return false;
      }

      return true;
    }
  };

  const getFilteredContactsByName = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
  };

  return (<>
    <Wrapper>
      <Section title='Phonebook'>
        <ContactForm
          onSubmit={handleSubmit} />
      </Section>
      <Section title='Contacts'>
        <Filter label='Find contacts by name'
                value={filter}
                onChange={handleFilterChange}
                isDisabled={contacts.length === 0} />
        {contacts.length > 0 ? <ContactList contacts={getFilteredContactsByName()}
                                            onDelete={handleContactDeleteById} /> :
          <p>Please, add a contact to get started.</p>}
      </Section>
    </Wrapper>
    <Toaster position='top-right' />
    <GlobalStyles />
  </>);
}
