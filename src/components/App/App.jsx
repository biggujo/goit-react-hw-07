import React, { Component } from 'react';

import { Wrapper } from './App.styled';

import GlobalStyles from '../GlobalStyles';
import Section from '../Section';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

import { toast, Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

const LS_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [
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
    ],
    filter: '',
  };

  componentDidMount() {
    try {
      const stringifiedContacts = localStorage.getItem(LS_KEY);

      const parsedContacts = JSON.parse(stringifiedContacts);

      this.setState({ contacts: parsedContacts });

    } catch {
      toast.error(`Error reading "${LS_KEY}" from the local storage`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts: prevContacts } = prevState;
    const { contacts: nextContacts } = this.state;

    if (prevContacts.length === nextContacts.length) {
      return;
    }

    try {
      const stringifiedContacts = JSON.stringify(nextContacts);

      localStorage.setItem(LS_KEY, stringifiedContacts);
    } catch {
      toast.error(`Error writing "${LS_KEY}" to the local storage`);
    }
  }

  handleChange = ({
    currentTarget: {
      value,
      name,
    },
  }) => {
    this.setState({ [name]: value });
  };

  handleContactDeleteById = (id) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id: contactId }) => {
          return contactId !== id;
        }),
      };
    });

  };

  // Return true if success, otherwise return false
  handleSubmit = (contact) => {
    return this.addContact(contact);
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
  addContact = ({
    name,
    phone,
  }) => {
    const {
      contacts,
    } = this.state;

    if (!isNameValid()) {
      return false;
    }

    if (!isPhoneValid()) {
      return false;
    }

    // Add a non-empty unique contact
    this.setState((prevState) => {
      return {
        contacts: [
          {
            id: nanoid(),
            name,
            phone,
          },
          ...prevState.contacts,
        ],
      };
    });

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

  getFilteredContactsByName = () => {
    const {
      contacts,
      filter,
    } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
  };

  render() {
    const {
      contacts,
      filter,
    } = this.state;

    const visibleContacts = this.getFilteredContactsByName();

    return (<>
      <Wrapper>
        <Section title='Phonebook'>
          <ContactForm
            onSubmit={this.handleSubmit} />
        </Section>
        <Section title='Contacts'>
          <Filter label='Find contacts by name'
                  value={filter}
                  onChange={this.handleChange}
                  isDisabled={contacts.length === 0} />

          {contacts.length > 0 ? <ContactList contacts={visibleContacts}
                                              onDelete={this.handleContactDeleteById} /> :
            <p>Please, add a contact to get started.</p>}
        </Section>
      </Wrapper>

      <Toaster position='top-right' />
      <GlobalStyles />
    </>);
  }
}

export default App;
