import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import {
  deleteContactByIdThunk,
  selectContactsLength,
  selectError,
  selectStatus,
  selectVisibleContacts,
} from '../../redux/contacts';
import { Status } from '../../utils';
import { Contact } from '../../interfaces';

export default function ContactList() {
  const visibleContacts = useSelector(selectVisibleContacts);
  const contactsLength = useSelector(selectContactsLength);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  if (status === Status.PENDING) {
    return <p>Loading contacts...</p>;
  }

  if (status === Status.REJECTED) {
    return <p>Error: {error}. Try to reload the page.</p>;
  }

  if (status === Status.FULFILLED && contactsLength === 0) {
    return <p>Please, add a contact to get started.</p>;
  }

  if (status === Status.FULFILLED) {
    if (visibleContacts.length === 0) {
      return <p>No contacts with such name have been found.</p>;
    }

    return (<ul>
      {visibleContacts.map(({
                              id,
                              name,
                              phone,
                            }: Contact & { id: string }) => <li key={id}>
        <ContactItem id={id}
                     fullName={name}
                     phone={phone}
                     onDelete={() => {
                       dispatch(deleteContactByIdThunk(id))
                         .unwrap()
                         .then(() => {
                           toast.success(`A contact "${name}" has been deleted`);
                         });
                     }}
        />
      </li>)}
    </ul>);
  }
}
