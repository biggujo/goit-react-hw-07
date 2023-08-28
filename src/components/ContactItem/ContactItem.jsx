import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ContactItem.styled';

export default function ContactItem({
  id,
  fullName,
  phone,
  onDelete,
}) {
  return (<div>
    <p>{fullName}: {phone} <Button type='button'
                                   onClick={() => onDelete(id)}>Delete</Button>
    </p>

  </div>);
}

ContactItem.propTypes = {
  fullName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
