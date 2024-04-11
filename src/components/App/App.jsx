import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Wrapper } from './App.styled';
import Section from '../Section';
import ContactForm from '../ContactForm';
import SearchBox from '../SearchBox';
import ContactList from '../ContactList';
import GlobalStyles from '../GlobalStyles';
import { selectContacts } from '../../redux/contactsSlice';

export default function App() {
  const contacts = useSelector(selectContacts);

  return (<>
    <Wrapper>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <SearchBox />
        {contacts.length > 0 ? <ContactList /> :
          <p>Please, add a contact to get started.</p>}
      </Section>
    </Wrapper>
    <Toaster position="top-right" />
    <GlobalStyles />
  </>);
}
