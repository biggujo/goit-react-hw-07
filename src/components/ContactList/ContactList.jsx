import { useSelector } from 'react-redux';
import Contact from '../Contact';
import {
  selectFilteredContacts,
} from '../../redux/contactsSlice';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (<ul>
    {filteredContacts.map(({
      id,
      name,
      number,
    }) => <li key={id}>
      <Contact id={id}
               fullName={name}
               number={number} />
    </li>)}
  </ul>);
}
