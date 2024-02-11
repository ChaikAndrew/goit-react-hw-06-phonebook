import { useSelector, useDispatch } from 'react-redux';
import { addContacts, deletePhoneBook, changeFilter } from './contactsUtils';
import { customToast } from './helper';

export const useContacts = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const onAddContacts = (name, number) => {
    addContacts(dispatch, contacts, name, number, customToast);
  };

  const onDeletePhoneBook = contactsListId => {
    deletePhoneBook(dispatch, contacts, contactsListId, customToast);
  };

  const onChangeFilter = e => {
    changeFilter(dispatch, e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return {
    contacts,
    filter,
    dispatch,
    onAddContacts,
    onDeletePhoneBook,
    onChangeFilter,
    normalizedFilter,
    visibleContacts,
  };
};
