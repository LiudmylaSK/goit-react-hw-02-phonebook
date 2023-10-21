import css from './ContactsListItem.module.css'

export const ContactsListItem = ({ name, number, id, onDeleteContact }) => {
  return (
    <li key={id} className={css.listItem}>
      {name}: {number}
      <button className={css.buttonDeleteItem} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};