import { useSelector } from 'react-redux';
import Contact from '../Contact';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice.js';

export default function ContactList() {
  const filter = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
  };

  return (<ul>
    {getVisibleContacts().map(({
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
