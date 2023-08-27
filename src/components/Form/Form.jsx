import React from 'react';
import { Button, FormStyled, Input, Label } from './Form.styled';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function Form({
  name,
  phone,
  onChange,
  onSubmit,
}) {
  const nameInputId = nanoid();
  const phoneInputId = nanoid();

  return (<FormStyled onSubmit={onSubmit}>
    <Label htmlFor={nameInputId}>Name</Label>
    <Input type='text'
           id={nameInputId}
           name='name'
           value={name}
           onChange={onChange}
           required />

    <Label htmlFor={phoneInputId}>Phone</Label>
    <Input type='tel'
           id={phoneInputId}
           name='phone'
           value={phone}
           onChange={onChange}
           title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
           required />
    <Button type='submit'>Add contact</Button>
  </FormStyled>);
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
