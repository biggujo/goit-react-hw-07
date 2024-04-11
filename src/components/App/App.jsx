import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Wrapper } from './App.styled';
import Section from '../Section';
import ContactForm from '../ContactForm';
import SearchBox from '../SearchBox';
import ContactList from '../ContactList';
import GlobalStyles from '../GlobalStyles';
import {
  selectContacts, selectError, selectLoading,
} from '../../redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsOps.js';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (<>
    <Wrapper>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <SearchBox />
        {!isLoading && !error && contacts.length > 0 && <ContactList />}
        {!isLoading && !error && contacts.length === 0 &&
          <p>Please, add a contact to get started.</p>}
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </Section>
    </Wrapper>
    <Toaster position="top-right" />
    <GlobalStyles />
  </>);
}
