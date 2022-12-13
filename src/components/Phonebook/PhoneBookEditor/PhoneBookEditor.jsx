import { useState } from 'react';
import s from './PhoneBookEditor.module.css';

function PhoneBookEditor({ onSubmit }) {
  // const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const nameValue = name.trim();
    const numberValue = number.trim();
    onSubmit(nameValue, numberValue);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={s.PhoneBook__form}>
      <p className={s.Name__editor}>Name</p>
      <input
        className={s.Form__input}
        onChange={handleChangeName}
        placeholder="Andrii Chaika"
        required
      ></input>
      <p className={s.Namber__editor}>Number</p>
      <input
        className={s.Form__input}
        onChange={handleChangeNumber}
        type="tel"
        name="number"
        placeholder="+38(050)555-55-55"
        pattern="\+?[0-9\s\-\(\)]+"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      ></input>
      <button type="submit" className={s.PhoneBookList__btn}>
        Add contact
      </button>
    </form>
  );
}

export default PhoneBookEditor;
