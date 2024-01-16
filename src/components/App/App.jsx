import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Wrapper } from './App.styled';
import Section from '../Section';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import GlobalStyles from '../GlobalStyles';
import { selectContactsLength } from '../../redux/contacts';
import { selectFilter } from '../../redux/filter';
import { fetchContactsThunk } from '../../redux/contacts';

export default function App() {
  const filter = useSelector(selectFilter);
  const contactsLength = useSelector(selectContactsLength);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, []);

  return (<>
    <Wrapper>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <Filter label="Find contacts by name"
                value={filter}
                isDisabled={contactsLength === 0} />
        <ContactList />
      </Section>
    </Wrapper>
    <Toaster position="top-right" />
    <GlobalStyles />
  </>);
}
