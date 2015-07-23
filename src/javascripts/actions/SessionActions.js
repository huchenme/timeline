import {SESSION_ACTIONS} from 'constants/AppConstants';
import AppDispatcher from 'dispatcher/AppDispatcher';
import WebAPIUtils from 'utils/WebAPIUtils';

export default {
  login(username, password) {
    AppDispatcher.dispatch({
      actionType: SESSION_ACTIONS.LOGIN_REQUEST,
      username: username,
      password: password,
    });
    WebAPIUtils.login(username, password);
  },

  loginSuccess(json) {
    AppDispatcher.dispatch({
      actionType: SESSION_ACTIONS.LOGIN_RESPONSE,
      json: json,
      error: false,
    });
  },

  loginFail() {
    AppDispatcher.dispatch({
      actionType: SESSION_ACTIONS.LOGIN_RESPONSE,
      error: true,
    });
    alert('login fail');
  },
};
