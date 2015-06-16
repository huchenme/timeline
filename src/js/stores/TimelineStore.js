import {OrderedMap, Map, List} from 'immutable';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import moment from 'moment';

import {TimelineActions, CHANGE} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';
import timelineData from 'data/timelines';

let _timelines = getTimelineList(timelineData);

function getTimelineList(json) {
  let list = OrderedMap();
  json.forEach(item => {
    list = list.set(item.objectId, Map({
      date: moment(item.date),
      text: item.text,
      featured: item.featured,
      images: List(item.images)
    }));
  });
  return list;
}

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
    return _timelines.sortBy(item => item.get('date').unix());
  },

  nextTimelineId() {
    return (new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }
});

AppDispatcher.register(action => {
  if(__DEV__) {
    console.log('[DISPATCHER]', action);
  }
  switch(action.actionType) {
    case TimelineActions.ADD_TIMELINE:
      const id = TimelineStore.nextTimelineId();
      _timelines = _timelines.set(id, action.item);
      break;

    case TimelineActions.UPDATE_TIMELINE:
      _timelines = _timelines.set(action.id, action.item);
      break;

    case TimelineActions.DELETE_TIMELINE:
      _timelines = _timelines.remove(action.id);
      break;

    default:
  }

  TimelineStore.emitChange();
});

export default TimelineStore;
