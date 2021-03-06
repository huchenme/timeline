import React from 'react';
import {Navigation} from 'react-router';

import SessionStore from 'stores/SessionStore';
import SessionActions from 'actions/SessionActions';

function getState() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
  };
}

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    if (this.state.isLoggedIn) {
      // this.transitionTo('/');
    }
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  render() {
    let login;
    let logout;
    if (this.state.isLoggedIn) {
      logout = <a onClick={this._onLogout}>logout</a>
    } else {
      login = (
        <form onSubmit={this._onSubmit}>
          <input type="text" ref="username" placeholder="Username" autoFocus />
          <input type="password" ref="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      );
    }
    return (
      <div>
        {login}
        {logout}
      </div>
    );
  },

  _onChange() {
    this.setState(getState());
    // if (this.state.isLoggedIn) {
      this.transitionTo('/');
    // }
  },

  _onSubmit(e) {
    e.preventDefault();
    const usernameInput = React.findDOMNode(this.refs.username).value.trim();
    const passwordInput = React.findDOMNode(this.refs.password).value.trim();
    if (!usernameInput || !passwordInput) {
      return;
    }
    SessionActions.login(usernameInput, passwordInput);
  },

  _onLogout() {
    SessionActions.logout();
  },
});
