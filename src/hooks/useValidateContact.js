import toast from 'react-hot-toast';

const validateName = (name, contacts) => {
  if (!name) {
    toast.error('Provide a name');
    return false;
  }

  if (contacts.find(({ name: contactName }) => contactName === name)) {
    toast.error('Choose a unique name');
    return false;
  }

  return true;
};

const validatePhone = (phone) => {
  if (!phone) {
    toast.error('Provide a phone');
    return false;
  }

  const regExp = new RegExp('^[0-9 -\'+]+$');

  const isPhoneAValidNumber = regExp.test(phone);

  if (!isPhoneAValidNumber) {
    toast.error(
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +');
    return false;
  }

  return true;
};

export const useValidateContact = () => {
  return [
    validateName,
    validatePhone,
  ];
};
