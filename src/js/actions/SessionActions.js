import {SessionActions} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';
import WebAPIUtils from 'js/utils/WebAPIUtils';

export default {
  login(username, password) {
    AppDispatcher.dispatch({
      actionType: SessionActions.LOGIN,
      username: username,
      password: password
    });
    WebAPIUtils.login(username, password);
  }
};
