import React, { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    number: '',
    name: '',
  };

  onInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ number: '', name: '' });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.onFormSubmit}>
        <label className={css.labelName}>
          Name
          <input
            className={css.inputName}
            type="text"
            name="name"
            required
            value={this.state.name}
            onChange={this.onInputChange}
            placeholder="Enter name..."
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Please enter your name using only letters, apostrophes, dashes, and spaces."
          />
        </label>
        <label className={css.labelTel}>
          Number
          <input
            className={css.inputTel}
            type="tel"
            name="number"
            required
            value={this.state.number}
            onChange={this.onInputChange}
            placeholder="Enter number..."
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
             title="Enter your phone number in the following format: +country code (for example, +38 for Ukraine) followed by your number. Allowed characters: digits, spaces, dashes, parentheses."
          />
        </label>
        <button className={css.buttonAddContact} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
