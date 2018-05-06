import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsApi from './utils/ContactsApi'

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsApi.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsApi.remove(contact)
  }
  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact} />
      </div>
    )
  }
}

export default App;