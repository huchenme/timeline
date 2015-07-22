import {TIMELINE_ACTIONS} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';
import WebAPIUtils from 'js/utils/WebAPIUtils';
import {timelineToJson, timelineUpdateJson} from 'js/utils/DataSerializer';

export default {
  loadTimelines() {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.LOAD_TIMELINES,
    });
    WebAPIUtils.loadTimelines();
  },

  loadTimelinesFail() {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.LOAD_TIMELINES_RESPONSE,
      error: true,
    });
  },

  loadTimelinesSuccess(json) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.LOAD_TIMELINES_RESPONSE,
      json: json,
      error: false,
    });
  },

  addItem(item) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.ADD_TIMELINE,
      item: item,
    });
    WebAPIUtils.createTimeline(timelineToJson(item));
  },

  addItemFail() {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.ADD_TIMELINE_RESPONSE,
      error: true,
    });
  },

  addItemSuccess(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.ADD_TIMELINE_RESPONSE,
      id: id,
      error: false,
    });
  },

  updateItem(id, item) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.UPDATE_TIMELINE,
      id: id,
      item: item,
    });
    WebAPIUtils.updateTimeline(id, timelineUpdateJson(item));
  },

  updateItemFail(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.UPDATE_TIMELINE_RESPONSE,
      error: true,
      id: id,
    });
  },

  updateItemSuccess(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.UPDATE_TIMELINE_RESPONSE,
      error: false,
      id: id,
    });
  },

  deleteItem(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.DELETE_TIMELINE,
      id: id,
    });
    WebAPIUtils.deleteTimeline(id);
  },

  deleteItemFail(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.DELETE_TIMELINE_RESPONSE,
      error: true,
      id: id,
    });
  },

  deleteItemSuccess(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.DELETE_TIMELINE_RESPONSE,
      error: false,
      id: id,
    });
  },
};
