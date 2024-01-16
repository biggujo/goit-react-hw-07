import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Button, ContactFormStyled, Input, Label } from './ContactForm.styled';
import { addContactThunk } from '../../redux/contacts';
import { useValidateContact } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [validateName, validatePhone] = useValidateContact();

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

    // name, phone
    const entries = Object.fromEntries(new FormData(event.target).entries());

    const isSubmitSuccessful = pushContact(entries);

    if (isSubmitSuccessful) {
      resetFormInfo();
    }
  };

  /**
   * Returns false if an error has occurred
   *
   * Possible errors:
   * 1. Empty name
   * 2. ContactItem duplicate
   * 3. Phone is empty
   * 4. Regular expression test has failed
   *
   * RegExp rules: 0-9, +, ', -
   */
  const pushContact = ({
    name,
    phone,
  }) => {
    if (!validateName(name, contacts)) {
      return false;
    }

    if (!validatePhone(phone)) {
      return false;
    }

    // Add a non-empty unique contact
    dispatch(addContactThunk({
      name,
      phone,
    }));

    return true;
  };

  const resetFormInfo = () => {
    setName('');
    setPhone('');
  };

  return <ContactFormStyled onSubmit={handleSubmit}>
    <Label htmlFor={nameInputId.current}>Name</Label>
    <Input type="text"
           id={nameInputId.current}
           name="name"
           value={name}
           onChange={handleInputChange}
           required />

    <Label htmlFor={phoneInputId.current}>Phone</Label>
    <Input type="tel"
           id={phoneInputId.current}
           name="phone"
           value={phone}
           onChange={handleInputChange}
           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
           required />
    <Button type="submit">Add contact</Button>
  </ContactFormStyled>;
}
