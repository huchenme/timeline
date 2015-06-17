import request from 'superagent';

import {API_ENDPOINTS, API_HEADERS, LEANCLOUD} from 'js/constants/AppConstants';
import SessionActions from 'js/actions/SessionActions';

export default {
  login(username, password) {
    console.log(username, password);
    request.get(API_ENDPOINTS.LOGIN)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .query({username: username, password: password})
    .end(function(error, res) {
      if(__DEV__) {
        console.log(res, error);
      }
      if (error) {
        SessionActions.loginFail();
      } else {
        const json = JSON.parse(res.text);
        SessionActions.loginSuccess(json);
      }
    });
  }
};
