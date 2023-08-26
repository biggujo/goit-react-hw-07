import React from 'react';
import ContactItem from '../Contact/ContactItem';
import { nanoid } from 'nanoid';

export default function ContactList({ contacts }) {
  return (<ul>
    {contacts.map((contact) => <li key={nanoid()}>
      <ContactItem fullName={contact} />
    </li>)}
  </ul>);
}
