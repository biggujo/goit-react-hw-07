import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Wrapper } from './App.styled';
import Section from '../Section';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import GlobalStyles from '../GlobalStyles';
import { getContacts } from '../../redux/contacts/selectors';
import {
  addContact,
} from '../../redux/contacts/contactsSlice';
import { getFilter } from '../../redux/filter/selectors';

export default function App() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  // Return true if success, otherwise return false
  const handleSubmit = (contact) => {
    return pushContact(contact);
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
  const pushContact = ({
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
    dispatch(addContact({
      name,
      phone,
    }));

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

  return (<>
    <Wrapper>
      <Section title='Phonebook'>
        <ContactForm
          onSubmit={handleSubmit} />
      </Section>
      <Section title='Contacts'>
        <Filter label='Find contacts by name'
                value={filter}
                isDisabled={contacts.length === 0} />
        {contacts.length > 0 ? <ContactList /> :
          <p>Please, add a contact to get started.</p>}
      </Section>
    </Wrapper>
    <Toaster position='top-right' />
    <GlobalStyles />
  </>);
}
