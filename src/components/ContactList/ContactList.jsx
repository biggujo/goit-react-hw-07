import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import { nanoid } from 'nanoid';

export default function ContactList({
  contacts,
  onDelete,
}) {
  return (<ul>
    {contacts.map(({
      id,
      name,
      phone,
    }) => <li key={nanoid()}>
      <ContactItem id={id}
                   fullName={name}
                   phone={phone}
                   onDelete={onDelete} />
    </li>)}
  </ul>);
}
