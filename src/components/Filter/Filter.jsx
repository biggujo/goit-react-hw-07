import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Input, Label, Wrapper } from './Filter.styled';

export default function Filter({
  label,
  value,
  isDisabled,
  onChange,
}) {
  const filterInputId = nanoid();
  return (<Wrapper>
    <Label htmlFor={filterInputId}>{label}</Label>
    <Input type='text'
           id={filterInputId}
           name='filter'
           value={value}
           disabled={isDisabled}
           onChange={onChange} />
  </Wrapper>);
}

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
