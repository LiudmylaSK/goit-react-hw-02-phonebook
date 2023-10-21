import { ContactsListItem } from '../ContactsListItem/ContactsListItem'
import css  from './ContactsList.module.css'

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map(({ name, number, id }) => {
        return (
          <ContactsListItem
            key={id}
            id={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
          />
        );
      })}
    </ul>
  );
};