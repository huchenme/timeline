import {TIMELINE_ACTIONS} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';
import WebAPIUtils from 'js/utils/WebAPIUtils';

export default {
  loadTimelines() {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.LOAD_TIMELINES
    });
    WebAPIUtils.loadTimelines();
  },

  loadTimelinesFail() {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.LOAD_TIMELINES_RESPONSE,
      error: true
    });
  },

  loadTimelinesSuccess(json) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.LOAD_TIMELINES_RESPONSE,
      json: json,
      error: false
    });
  },

  addItem(item) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.ADD_TIMELINE,
      item: item
    });
  },

  updateItem(id, item) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.UPDATE_TIMELINE,
      id: id,
      item: item
    });
  },

  deleteItem(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.DELETE_TIMELINE,
      id: id
    });
  }
};
