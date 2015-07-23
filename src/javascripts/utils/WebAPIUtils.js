import request from 'superagent';

import {API} from 'constants/AppConstants';
import LEANCLOUD from 'constants/LeanCloud';
import SessionActions from 'actions/SessionActions';
import TimelineActions from 'actions/TimelineActions';
import SessionStore from 'stores/SessionStore';

export default {
  login(username, password) {
    request.get(API.ENDPOINTS.LOGIN)
    .set(API.HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API.HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .query({username: username, password: password})
    .end((error, res) => {
      if (__DEV__) {
        console.log('login', res, error); // eslint-disable-line no-console
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
    request.get(API.ENDPOINTS.CLOUDQUERY)
    .set(API.HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API.HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .query({cql: API.QUERYS.ALL_TIMELINE})
    .end((error, res) => {
      if (__DEV__) {
        console.log('loadTimelines', res, error); // eslint-disable-line no-console
      }
      if (error) {
        TimelineActions.loadTimelinesFail();
      } else {
        const json = JSON.parse(res.text);
        TimelineActions.loadTimelinesSuccess(json);
      }
    });
  },

  createTimeline(data) {
    request.post(API.ENDPOINTS.TIMELINE)
    .set(API.HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API.HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .set(API.HEADERS.SESSION_TOKEN, SessionStore.getSessionToken())
    .type('json')
    .send(data)
    .end((error, res) => {
      if (__DEV__) {
        console.log('createTimeline', res, error); // eslint-disable-line no-console
      }
      if (error) {
        TimelineActions.addItemFail();
      } else {
        const json = JSON.parse(res.text);
        TimelineActions.addItemSuccess(json.objectId);
      }
    });
  },

  updateTimeline(id, data) {
    request.put(`${API.ENDPOINTS.TIMELINE}/${id}`)
    .set(API.HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API.HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .set(API.HEADERS.SESSION_TOKEN, SessionStore.getSessionToken())
    .type('json')
    .send(data)
    .end((error, res) => {
      if (__DEV__) {
        console.log('updateTimeline', res, error); // eslint-disable-line no-console
      }
      if (error) {
        TimelineActions.updateItemFail(id);
      } else {
        TimelineActions.updateItemSuccess(id);
      }
    });
  },

  deleteTimeline(id) {
    request.put(`${API.ENDPOINTS.TIMELINE}/${id}`)
    .set(API.HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API.HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .set(API.HEADERS.SESSION_TOKEN, SessionStore.getSessionToken())
    .type('json')
    .send({deleted: true})
    .end((error, res) => {
      if (__DEV__) {
        console.log('deleteTimeline', res, error); // eslint-disable-line no-console
      }
      if (error) {
        TimelineActions.deleteItemFail(id);
      } else {
        TimelineActions.deleteItemSuccess(id);
      }
    });
  },
};
