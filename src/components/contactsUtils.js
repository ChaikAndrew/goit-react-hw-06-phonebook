import shortid from 'shortid';
import * as contactActions from '../redux/contacts';

export const addContacts = (dispatch, contacts, name, number, customToast) => {
  const findName = contacts.find(contact => contact.name === name);

  if (name === '') {
    customToast(`Поле "Ім'я" порожнє`, 'error');
    return;
  }

  if (number === '') {
    customToast(`Поле "Номер" порожнє`, 'error');
    return;
  }

  if (findName !== undefined) {
    customToast(
      `Контакт з ім'ям "${name}" вже є у списку контактів`,
      'warning'
    );
  } else {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    dispatch(contactActions.add(contact));
    customToast(`Контакт "${name}" додано`, 'success');
  }
};

export const deletePhoneBook = (
  dispatch,
  contacts,
  contactsListId,
  customToast
) => {
  const updatedContacts = contacts.filter(
    contact => contact.id !== contactsListId
  );
  dispatch(contactActions.remove(updatedContacts));
  customToast('Контакт видалено', 'success');
};

export const changeFilter = (dispatch, value) => {
  dispatch(contactActions.filter(value));
};
