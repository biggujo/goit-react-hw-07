import React from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Input, Label, Wrapper } from './Filter.styled';
import { setFilter } from '../../redux/filter/filterSlice';

export default function Filter({
  label,
  value,
  isDisabled,
}) {
  const dispatch = useDispatch();

  const filterInputId = nanoid();
  return (<Wrapper>
    <Label htmlFor={filterInputId}>{label}</Label>
    <Input type='text'
           id={filterInputId}
           name='filter'
           value={value}
           disabled={isDisabled}
           onChange={(event) => dispatch(setFilter(event.target.value))} />
  </Wrapper>);
}

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
