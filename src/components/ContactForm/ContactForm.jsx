import { useDispatch } from 'react-redux';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {
  Button, ContactFormStyled, ErrorMessageStyled, Input, Label,
} from './ContactForm.styled';
import { addContact } from '../../redux/contactsOps.js';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required(),
  number: Yup.string().min(3).max(50).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addContact(values));
      resetForm();
    },
  });

  return <FormikProvider value={formik}>
    <ContactFormStyled onSubmit={formik.handleSubmit}>
      <div>
        <Label>
          Name
          <Input type="text"
                 name="name"
                 value={formik.values.name}
                 onChange={formik.handleChange} />
        </Label>
        <ErrorMessage name="name" component={ErrorMessageStyled} />
      </div>

      <div>
        <Label>
          Phone
          <Input type="tel"
                 name="number"
                 value={formik.values.number}
                 onChange={formik.handleChange} />
        </Label>
        <ErrorMessage name="number" component={ErrorMessageStyled} />
      </div>

      <Button type="submit">Add contact</Button>
    </ContactFormStyled>
  </FormikProvider>;
}
