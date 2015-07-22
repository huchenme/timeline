import {SESSION_ACTIONS} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';
import WebAPIUtils from 'js/utils/WebAPIUtils';

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
  },
};
