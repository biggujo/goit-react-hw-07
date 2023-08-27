import React from 'react';
import ContactItem from '../Contact/ContactItem';
import { nanoid } from 'nanoid';

export default function ContactList({ contacts }) {
  return (<ul>
    {contacts.map(({
      name,
      phone,
    }) => <li key={nanoid()}>
      <ContactItem fullName={name} phone={phone} />
    </li>)}
  </ul>);
}
