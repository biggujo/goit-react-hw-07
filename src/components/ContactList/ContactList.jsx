import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import {
  deleteContactByIdThunk,
  selectContactsLength,
  selectError,
  selectStatus,
  selectVisibleContacts,
} from '../../redux/contacts';
import { Status } from '../../redux/contacts';

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
    return <p>Error: {error}</p>;
  }

  if (status === Status.FULFILLED && contactsLength === 0) {
    return <p>Please, add a contact to get started.</p>;
  }

  if (status === Status.FULFILLED) {
    return (<ul>
      {visibleContacts.map(({
        id,
        name,
        phone,
      }) => <li key={id}>
        <ContactItem id={id}
                     fullName={name}
                     phone={phone}
                     onDelete={() => dispatch(deleteContactByIdThunk(id))}
        />
      </li>)}
    </ul>);
  }
}
