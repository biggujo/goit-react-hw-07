import React from 'react';
import PropTypes from 'prop-types';

export default function ContactItem({
  fullName,
  phone,
}) {
  return (<div><p>{fullName}: {phone}</p></div>);
}

ContactItem.propTypes = {
  fullName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
