import Fluxxor from 'fluxxor';
import {Actions} from 'js/constants/AppConstants';
import timelineData from 'data/timelines';
import {OrderedMap} from 'immutable';

const TimelineStore = Fluxxor.createStore({
  initialize() {
    this.timelines = OrderedMap(timelineData);

    this.bindActions(
      Actions.ADD_TIMELINE, this.onAddTimeline,
      Actions.DELETE_TIMELINE, this.onDeleteTimeline,
      Actions.UPDATE_TIMELINE, this.onUpdateTimeline
    );
  },

  onAddTimeline(payload) {
    const id = this._nextTimelineId();
    const item = {
      objectId: id,
      date: payload.date,
      text: payload.text
    };
    this.timelines = this.timelines.set(id, item);
    this.emit('change');
  },

  onDeleteTimeline(payload) {
    this.timelines = this.timelines.remove(payload.id);
    this.emit('change');
  },

  onUpdateTimeline(payload) {
    this.timelines = this.timelines.set(payload.id, payload.item);
    this.emit('change');
  },

  getItems() {
    return this.timelines.sortBy(item => item.date.getTime());
  },

  _nextTimelineId() {
    return (new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }
});

module.exports = TimelineStore;
