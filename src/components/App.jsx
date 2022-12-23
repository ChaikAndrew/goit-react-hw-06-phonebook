import React from 'react';
import PhoneBookList from './Phonebook/PhoneBookList/PhoneBookList';
import PhoneBookEditor from './Phonebook/PhoneBookEditor/PhoneBookEditor';
import Filter from './Phonebook/PhoneBookFilter/PhoneBookFilter';
import shortid from 'shortid';
import s from './Container.module.css';
import { customToast } from './helper';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as contactActions from '../redux/contacts';

export default function App() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  console.log('filter ==>', filter);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = (name, number) => {
    const findName = contacts.find(contact => contact.name === name);

    if (name === '') {
      customToast(`Field name is empty`, 'error');
      return;
    }

    if (number === '') {
      customToast(`Field number is empty`, 'error');
      return;
    }

    if (findName !== undefined) {
      customToast(
        `Contact name "${name}" is already in the contact list`,
        'warning'
      );
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };

      dispatch(contactActions.add(contact));
      customToast(`Contact "${name}" has been add`, 'success');
    }
  };

  const deletePhoneBook = contactsListId => {
    const updatedCoontacts = contacts.filter(
      contact => contact.id !== contactsListId
    );
    dispatch(contactActions.remove(updatedCoontacts));
    customToast(`Contact has been deleted`, 'success');
  };

  const changeFilter = e => {
    dispatch(contactActions.filter(e.currentTarget.value));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={s.Phonebook__container}>
      <h1 className={s.Phonebook__title}>PhoneBook</h1>
      <PhoneBookEditor onSubmit={addContacts} />

      {contacts.length > 0 ? (
        <>
          <p className={s.Contacts__title}>
            There are {contacts.length} contacts in your PhoneBook
          </p>
          <Filter value={filter} onChange={changeFilter} />

          <PhoneBookList
            contacts={visibleContacts}
            ondeletePhoneBook={deletePhoneBook}
          />
          <ToastContainer />
        </>
      ) : (
        <p className={s.Contacts__title}>
          The contact book is empty. Add contacts to your phone book.
        </p>
      )}
    </div>
  );
}
