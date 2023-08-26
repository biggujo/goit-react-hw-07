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
  };

  handleChange = (event) => {
    const { currentTarget: { value: newName } } = event;

    this.updateName(newName);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const hasContactAddSucceeded = this.addContact();

    if (!hasContactAddSucceeded) {
      toast.error(
        'The contact is either empty or non-unique. Please, try again.');
      return;
    }

    this.resetName();
  };

  updateName = (name) => {
    this.setState({ name });
  };

  // Returns false if an error has occurred
  // Possible errors:
  // 1. Empty name
  // 2. Contact duplicate
  addContact = () => {
    const {
      contacts,
      name,
    } = this.state;

    if (!name) {
      return false;
    }

    if (contacts.includes(name)) {
      return false;
    }

    // Add a non-empty unique contact
    this.setState((state) => {
      return {
        contacts: [
          ...state.contacts,
          state.name,
        ],
      };
    });

    return true;
  };

  resetName = () => {
    this.setState({ name: '' });

  };

  render() {
    const {
      contacts,
      name,
    } = this.state;

    return (<>
      <Wrapper>
        <Section title='Phonebook'>
          <Form name={name}
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
