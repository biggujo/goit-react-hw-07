import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { Button, ContactFormStyled, Input, Label } from './ContactForm.styled';
import { useValidateContact } from '../../hooks';
import { addContactThunk, selectStatus } from '../../redux/contacts';
import { selectContacts } from '../../redux/contacts';
import { Contact } from '../../interfaces';
import { Status } from '../../utils';


export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts: Array<Contact> = useSelector(selectContacts);
  const status: string = useSelector(selectStatus);
  const dispatch = useDispatch();
  const [validateName, validatePhone] = useValidateContact();

  const nameInputId = useRef(nanoid());
  const phoneInputId = useRef(nanoid());

  // const handleInputChange = ({
  //                              currentTarget: {
  //                                value,
  //                                name,
  //                              },
  //                            }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { value, name }: { value: string, name: string } = currentTarget;

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // name, phone
    const entries: Record<string, FormDataEntryValue> =
      Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());

    const isSubmitSuccessful = pushContact(entries as unknown as Contact);

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
  const pushContact = (contact: Contact) => {
    if (!validateName(contact.name, contacts)) {
      return false;
    }

    // @ts-ignore
    if (!validatePhone(contact.phone)) {
      return false;
    }

    // Add a non-empty unique contact
    dispatch(addContactThunk({
      name,
      phone,
    }))
      .unwrap()
      .then(() => {
        toast.success('A contact has been added');
      })
      .catch((reason: string) => {
        toast.error(reason);
      });

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
    <Button type="submit"
            disabled={status === Status.PENDING}>Add contact</Button>
  </ContactFormStyled>;
}
