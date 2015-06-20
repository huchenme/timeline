import request from 'superagent';

import {API_ENDPOINTS, API_HEADERS, LEANCLOUD, USER_ID} from 'js/constants/AppConstants';
import SessionActions from 'js/actions/SessionActions';
import TimelineActions from 'js/actions/TimelineActions';
import SessionStore from 'js/stores/SessionStore';

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
    request.get(API_ENDPOINTS.CLOUDQUERY)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .query({cql: `select * from Timeline where createdBy=pointer('_User', '${USER_ID}') order by date desc`})
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
  },

  createTimeline(data) {
    request.post(API_ENDPOINTS.TIMELINE)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .set(API_HEADERS.SESSION_TOKEN, SessionStore.getSessionToken())
    .type('json')
    .send(data)
    .end(function(error, res) {
      if(__DEV__) {
        console.log('createTimeline', res, error);
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
    request.put(`${API_ENDPOINTS.TIMELINE}/${id}`)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .set(API_HEADERS.SESSION_TOKEN, SessionStore.getSessionToken())
    .type('json')
    .send(data)
    .end(function(error, res) {
      if(__DEV__) {
        console.log('updateTimeline', res, error);
      }
      if (error) {
        TimelineActions.updateItemFail(id);
      } else {
        TimelineActions.updateItemSuccess(id);
      }
    });
  },

  deleteTimeline(id) {
    request.post(`${API_ENDPOINTS.TIMELINE}/${id}`)
    .set(API_HEADERS.APP_ID, LEANCLOUD.APP_ID)
    .set(API_HEADERS.APP_KEY, LEANCLOUD.APP_KEY)
    .set(API_HEADERS.SESSION_TOKEN, SessionStore.getSessionToken())
    .type('json')
    .send({
      _method: 'DELETE'
    })
    .end(function(error, res) {
      if(__DEV__) {
        console.log('deleteTimeline', res, error);
      }
      if (error) {
        TimelineActions.deleteItemFail(id);
      } else {
        TimelineActions.deleteItemSuccess(id);
      }
    });
  }
};
