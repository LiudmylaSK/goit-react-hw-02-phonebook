import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import {MdContactPhone} from 'react-icons/md';
import css from './App.module.css'

import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { SearchFilter } from './SearchFilter/SearchFilter';

Notify.init({
  borderRadius: '10px',
  position: 'center-top',
  width: '300px',
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
  info: {
    background: '#f2e230',
    textColor: '#00f'
  },
 
});

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    if (contacts.some(contact => contact.name.toLowerCase() === normalizedName)) {
      return Notify.info(`${name} is already in your contacts`);
    }

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));

    Notify.success(`${name} has been successfully added to your contacts`);
  };

 

 onDeleteContact = contactId => {
  Confirm.show(
   'Confirm',
'Are you sure you want to delete this contact?',
'Yes',
'No',
    function() {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      }));
      Notify.success('The contact has been successfully deleted');
    }.bind(this),
    function() {
      Notify.info('The deletion has been cancelled');
    }.bind(this)
  );
};


  filterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filteringContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filteringContacts();

    return (
      
        <div className={css.container}>
          <h1 className={css.mainTitle}><MdContactPhone className={css.iconContact}/>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <h2 className={css.contactsTitle}>Contacts</h2>
          <SearchFilter value={filter} onChange={this.filterChange} />
          {filteredContacts.length > 0 ? (
            <ContactsList contacts={filteredContacts} onDeleteContact={this.onDeleteContact} />
          ) : (
            <p className={css.noContactsText}>There are no contacts in the Phonebook</p>
          )}
        </div>
     
    );
  }
}