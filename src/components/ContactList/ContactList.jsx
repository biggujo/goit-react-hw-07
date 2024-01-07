import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import { deleteContactById } from '../../redux/contacts/contactsSlice';
import { getContacts } from '../../redux/contacts/selectors';
import { getFilter } from '../../redux/filter/selectors';

export default function ContactList() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

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
      phone,
    }) => <li key={id}>
      <ContactItem id={id}
                   fullName={name}
                   phone={phone}
                   onDelete={() => dispatch(deleteContactById(id))} />
    </li>)}
  </ul>);
}
