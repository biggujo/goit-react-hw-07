import React from 'react';
import ContactItem from '../ContactItem';
import PropTypes from 'prop-types';

export default function ContactList({
  contacts,
  onDelete,
}) {
  return (<ul>
    {contacts.map(({
      id,
      name,
      phone,
    }) => <li key={id}>
      <ContactItem id={id}
                   fullName={name}
                   phone={phone}
                   onDelete={onDelete} />
    </li>)}
  </ul>);
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })).isRequired,
};
