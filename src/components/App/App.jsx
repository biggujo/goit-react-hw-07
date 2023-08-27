import React, { Component } from 'react';
import { Wrapper } from './App.styled';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import Section from '../Section/Section';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import { toast, Toaster } from 'react-hot-toast';
import Filter from '../Filter/Filter';

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
    name: '',
    phone: '',
  };

  handleInputChange = ({
    currentTarget: {
      value,
      name,
    },
  }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const hasContactAddSucceeded = this.addContact();

    if (!hasContactAddSucceeded) {
      toast.error(
        'The contact is either empty or non-unique. Please, try again.');
      return;
    }

    this.resetFormInfo();
  };

  /**
   * Returns false if an error has occurred
   *
   * Possible errors:
   * 1. Empty name
   * 2. Contact duplicate
   * 3. Phone is empty
   * 4. Regular expression test has failed
   *
   * RegExp rules: 0-9, +, ', -
   */
  addContact = () => {
    const {
      contacts,
      name,
      phone,
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
            name: prevState.name,
            phone: prevState.phone,
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

      if (contacts.includes(name)) {
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

      const regExp = new RegExp('^[0-9 \-\'+]+$');

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

  resetFormInfo = () => {
    this.setState({
      name: '',
      phone: '',
    });
  };

  render() {
    const {
      contacts,
      filter,
      name,
      phone,
    } = this.state;

    const visibleContacts = this.getFilteredContactsByName();

    return (<>
      <Wrapper>
        <Section title='Phonebook'>
          <Form name={name}
                phone={phone}
                onChange={this.handleInputChange}
                onSubmit={this.handleSubmit} />
        </Section>
        <Section title='Contacts'>
          <Filter label='Find contacts by name'
                  value={filter}
                  onChange={this.handleInputChange} />
          <ContactList contacts={visibleContacts}></ContactList>
        </Section>
      </Wrapper>

      <Toaster position='top-right' />
      <GlobalStyles />
    </>);
  }
}

export default App;
