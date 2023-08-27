import React, { Component } from 'react';
import { Wrapper } from './App.styled';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import Section from '../Section/Section';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import { toast, Toaster } from 'react-hot-toast';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    phone: '',
  };

  handleChange = (event) => {
    const {
      currentTarget: {
        value,
        name,
      },
    } = event;

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
          ...prevState.contacts,
          {
            name: prevState.name,
            phone: prevState.phone,
          },
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

  resetFormInfo = () => {
    this.setState({
      name: '',
      phone: '',
    });
  };

  render() {
    const {
      contacts,
      name,
      phone,
    } = this.state;

    return (<>
      <Wrapper>
        <Section title='Phonebook'>
          <Form name={name}
                phone={phone}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit} />
        </Section>
        <Section title='Contacts'>
          <ContactList contacts={contacts}></ContactList>
        </Section>
      </Wrapper>

      <Toaster position='top-right' />
      <GlobalStyles />
    </>);
  }
}

export default App;
