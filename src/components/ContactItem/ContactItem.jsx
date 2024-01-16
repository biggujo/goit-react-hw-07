import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ContactItem.styled';
import { useSelector } from 'react-redux';
import { selectStatus } from '../../redux/contacts';

export default function ContactItem({
  id,
  fullName,
  phone,
  onDelete,
}) {
  const status = useSelector(selectStatus);

  return (<div>
    <p>{fullName}: {phone} <Button type="button"
                                   onClick={() => onDelete(id)}>Delete</Button>
    </p>

  </div>);
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
