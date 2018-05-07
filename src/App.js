import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContacts'
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

  createContact(contact) {
    ContactsApi.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path="/create" render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/') //send user back to home screen
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;