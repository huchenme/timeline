import request from 'superagent';

import {APIEndpoints, APIHeaders, LeanCloud} from 'js/constants/AppConstants';

export default {
  login(username, password) {
    request.get(APIEndpoints.LOGIN)
    .set(APIHeaders.APP_ID, LeanCloud.APP_ID)
    .set(APIHeaders.APP_KEY, LeanCloud.APP_KEY)
    .send({username, password});
    // TODO
  }
};
