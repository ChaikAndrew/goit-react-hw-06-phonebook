import React from 'react';
import { useContacts } from './contactsActions';
import s from './Container.module.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../../src/redux/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PhoneBookList from './Phonebook/PhoneBookList/PhoneBookList';
import PhoneBookEditor from './Phonebook/PhoneBookEditor/PhoneBookEditor';
import Filter from './Phonebook/PhoneBookFilter/PhoneBookFilter';

export default function App() {
  const {
    contacts,
    filter,
    onAddContacts,
    onDeletePhoneBook,
    onChangeFilter,
    visibleContacts,
  } = useContacts();

  return (
    <PersistGate persistor={persistor} loading={null}>
      <div className={s.Phonebook__container}>
        <h1 className={s.Phonebook__title}>PhoneBook</h1>
        <PhoneBookEditor onSubmit={onAddContacts} />

        {contacts.length > 0 ? (
          <>
            <p className={s.Contacts__title}>
              There are {contacts.length} contacts in your PhoneBook
            </p>
            <Filter value={filter} onChange={onChangeFilter} />

            <PhoneBookList
              contacts={visibleContacts}
              ondeletePhoneBook={onDeletePhoneBook}
            />
            <ToastContainer />
          </>
        ) : (
          <p className={s.Contacts__title}>
            The contact book is empty. Add contacts to your phone book.
          </p>
        )}
      </div>
    </PersistGate>
  );
}
