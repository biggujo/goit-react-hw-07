import React, { Component } from 'react';
import { Button, ContactFormStyled, Input, Label } from './ContactForm.styled';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
    };

    this.nameInputId = nanoid();
    this.phoneInputId = nanoid();
  }

  handleInputChange = ({
    currentTarget: {
      value,
      name,
    },
  }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isSubmitSuccessful = this.props.onSubmit(this.state);

    if (isSubmitSuccessful) {
      this.resetFormInfo();
    }
  };

  resetFormInfo = () => {
    this.setState({
      name: '',
      phone: '',
    });
  };

  render() {
    const {
      name,
      phone,
    } = this.state;

    return <ContactFormStyled onSubmit={this.handleSubmit}>
      <Label htmlFor={this.nameInputId}>Name</Label>
      <Input type='text'
             id={this.nameInputId}
             name='name'
             value={name}
             onChange={this.handleInputChange}
             required />

      <Label htmlFor={this.phoneInputId}>Phone</Label>
      <Input type='tel'
             id={this.phoneInputId}
             name='phone'
             value={phone}
             onChange={this.handleInputChange}
             title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
             required />
      <Button type='submit'>Add contact</Button>
    </ContactFormStyled>;
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
