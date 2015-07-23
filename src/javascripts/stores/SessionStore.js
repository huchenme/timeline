import {EventEmitter} from 'events';
import assign from 'object-assign';

import {SESSION_ACTIONS, CHANGE} from 'constants/AppConstants';
import AppDispatcher from 'dispatcher/AppDispatcher';

let _sessionToken = sessionStorage.getItem('sessionToken');

const SessionStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE);
  },

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  },

  isLoggedIn() {
    return _sessionToken ? true : false;
  },

  getSessionToken() {
    return _sessionToken;
  },

});

SessionStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case SESSION_ACTIONS.LOGIN_RESPONSE:
      if (action.json && action.json.sessionToken) {
        _sessionToken = action.json.sessionToken;

        sessionStorage.setItem('sessionToken', _sessionToken);
      }
      break;

    default:
  }

  SessionStore.emitChange();
});

export default SessionStore;
