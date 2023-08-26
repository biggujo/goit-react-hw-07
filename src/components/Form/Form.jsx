import React from 'react';
import { Button, FormStyled, Input, Label } from './Form.styled';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function Form({
  name,
  onChange,
  onSubmit,
}) {
  const nameInputId = nanoid();

  return (<FormStyled onSubmit={onSubmit}>
    <Label htmlFor={nameInputId}>Name</Label>
    <Input type='text'
           id={nameInputId}
           value={name}
           onChange={onChange}
           required />
    <Button type='submit'>Add contact</Button>
  </FormStyled>);
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
