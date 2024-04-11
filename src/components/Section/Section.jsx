import React from 'react';
import PropTypes from 'prop-types';
import { Subtitle } from './Section.styled';

export default function Section({
  title,
  children,
}) {
  return (<>
      <Subtitle>{title}</Subtitle>
      {children}
    </>

  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
