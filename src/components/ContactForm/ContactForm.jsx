import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Button, ContactFormStyled, Input, Label } from './ContactForm.styled';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameInputId = useRef(nanoid());
  const phoneInputId = useRef(nanoid());

  const handleInputChange = ({
                               currentTarget: {
                                 value,
                                 name,
                               },
                             }) => {
    switch (name) {
      case 'name':
        setName(value);
        return;

      case 'phone':
        setPhone(value);
        return;

      default:
        return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isSubmitSuccessful = onSubmit(Object.fromEntries(new FormData(event.target).entries()));

    if (isSubmitSuccessful) {
      resetFormInfo();
    }
  };

  const resetFormInfo = () => {
    setName('');
    setPhone('');
  };

  return <ContactFormStyled onSubmit={handleSubmit}>
    <Label htmlFor={nameInputId.current}>Name</Label>
    <Input type='text'
           id={nameInputId.current}
           name='name'
           value={name}
           onChange={handleInputChange}
           required />

    <Label htmlFor={phoneInputId.current}>Phone</Label>
    <Input type='tel'
           id={phoneInputId.current}
           name='phone'
           value={phone}
           onChange={handleInputChange}
           title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
           required />
    <Button type='submit'>Add contact</Button>
  </ContactFormStyled>;
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
