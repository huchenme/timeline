import request from 'superagent';

import {API_ENDPOINTS, API_HEADERS, LEANCLOUD} from 'js/constants/AppConstants';
import SessionActions from 'js/actions/SessionActions';
import TimelineActions from 'js/actions/TimelineActions';

export default {
  login(username, password) {
    request.get(API_ENDPOINTS.LOGIN)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .query({username: username, password: password})
    .end(function(error, res) {
      if(__DEV__) {
        console.log('login', res, error);
      }
      if (error) {
        SessionActions.loginFail();
      } else {
        const json = JSON.parse(res.text);
        SessionActions.loginSuccess(json);
      }
    });
  },

  loadTimelines() {
    request.get(API_ENDPOINTS.TIMELINES)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .end(function(error, res) {
      if(__DEV__) {
        console.log('loadTimelines', res, error);
      }
      if (error) {
        TimelineActions.loadTimelinesFail();
      } else {
        const json = JSON.parse(res.text);
        TimelineActions.loadTimelinesSuccess(json);
      }
    });
  }

  // createTimeline(data) {

  // },

  // updateTimeline(id, data) {

  // },

  // deleteTimeline(id) {

  // }
};
