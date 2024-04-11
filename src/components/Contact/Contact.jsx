import PropTypes from 'prop-types';
import { Button } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps.js';

export default function Contact({
  id,
  fullName,
  number,
}) {
  const dispatch = useDispatch();

  return (<div>
    <p>{fullName}: {number} <Button type="button"
                                    onClick={() => dispatch(deleteContact(id))}>Delete</Button>
    </p>

  </div>);
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
