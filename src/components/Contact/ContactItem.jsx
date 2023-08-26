import React from 'react';
import PropTypes from 'prop-types';

export default function ContactItem({ fullName }) {
  return (<div><p>{fullName}</p></div>);
}

ContactItem.propTypes = {
  fullName: PropTypes.string.isRequired,
};
