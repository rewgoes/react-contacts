import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContacts'
import * as ContactsApi from './utils/ContactsApi'

class App extends Component {
  state = {
    screen: 'list', // list, create
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
        {this.state.screen === 'list' && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={() => {
              this.setState({ screen: 'create' })
            }}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact/>
        )}
      </div>
    )
  }
}

export default App;