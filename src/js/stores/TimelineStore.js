import {OrderedMap} from 'immutable';
import {EventEmitter} from 'events';
import assign from 'object-assign';

import {TIMELINE_ACTIONS, CHANGE, ASYNC_REQUEST_STATUS} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';
import {timelineListfromJson} from 'js/utils/DataSerializer';

let _timelines = new OrderedMap();
let _appStatus = ASYNC_REQUEST_STATUS.IDLE;
let _createStatus = ASYNC_REQUEST_STATUS.IDLE;
let _newTimeline;

const TimelineStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE);
  },

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  },

  getAllItems() {
    return _timelines.sortBy(item => -item.get('date').unix());
  },

  getAppStatus() {
    return _appStatus;
  },

  getCreateStatus() {
    return _createStatus;
  },

  nextTimelineId() {
    return (new Date() + Math.floor(Math.random() * 999999)).toString(36);
  },
});

TimelineStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case TIMELINE_ACTIONS.LOAD_TIMELINES:
      _appStatus = ASYNC_REQUEST_STATUS.REQUESTING;
      break;

    case TIMELINE_ACTIONS.LOAD_TIMELINES_RESPONSE:
      if (action.error) {
        _appStatus = ASYNC_REQUEST_STATUS.FAILED;
      } else {
        _appStatus = ASYNC_REQUEST_STATUS.IDLE;
        _timelines = timelineListfromJson(action.json.results);
      }
      break;

    case TIMELINE_ACTIONS.ADD_TIMELINE:
      _createStatus = ASYNC_REQUEST_STATUS.REQUESTING;
      _newTimeline = action.item;
      break;

    case TIMELINE_ACTIONS.ADD_TIMELINE_RESPONSE:
      if (action.error) {
        _createStatus = ASYNC_REQUEST_STATUS.FAILED;
      } else {
        _createStatus = ASYNC_REQUEST_STATUS.IDLE;
        _timelines = _timelines.set(action.id, _newTimeline);
        _newTimeline = null;
      }
      break;

    case TIMELINE_ACTIONS.UPDATE_TIMELINE:
      _timelines = _timelines.set(action.id, action.item);
      break;

    case TIMELINE_ACTIONS.UPDATE_TIMELINE_RESPONSE:
      if (__DEV__) {
        if (action.error) {
          console.log('update fail');
        } else {
          console.log('update success');
        }
      }
      break;

    case TIMELINE_ACTIONS.DELETE_TIMELINE:
      _timelines = _timelines.remove(action.id);
      break;

    case TIMELINE_ACTIONS.DELETE_TIMELINE_RESPONSE:
      if (__DEV__) {
        if (action.error) {
          console.log('delete fail');
        } else {
          console.log('delete success');
        }
      }
      break;

    default:
  }

  TimelineStore.emitChange();
});

export default TimelineStore;
