import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Input, Label, Wrapper } from './SearchBox.styled';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice.js';
import { selectContacts } from '../../redux/contactsSlice.js';

export default function SearchBox() {
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const filterInputId = nanoid();
  return (<Wrapper>
    <Label htmlFor={filterInputId}>Find contacts by name</Label>
    <Input type='text'
           id={filterInputId}
           name='filter'
           value={filterValue}
           disabled={contacts.length === 0}
           onChange={(event) => dispatch(changeFilter(event.target.value))} />
  </Wrapper>);
}

SearchBox.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
};
