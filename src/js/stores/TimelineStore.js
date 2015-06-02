const Fluxxor = require('fluxxor');
const constants = require('js/constants/AppConstants');
const timelineData = require('data/timelines');
const assign = require('object-assign');

const TimelineStore = Fluxxor.createStore({
  initialize() {
    this.timelines = timelineData;

    this.bindActions(
      constants.actions.ADD_TIMELINE, this.onAddTimeline,
      constants.actions.DELETE_TIMELINE, this.onDeleteTimeline,
      constants.actions.UPDATE_TIMELINE, this.onUpdateTimeline
    );
  },

  onAddTimeline(payload) {
    const id = this._nextTimelineId();
    const item = {
      objectId: id,
      date: payload.date,
      text: payload.text
    };
    this.timelines[id] = item;
    this.emit('change');
  },

  onDeleteTimeline(payload) {
    delete this.timelines[payload.id];
    this.emit('change');
  },

  onUpdateTimeline(payload) {
    this.timelines[payload.id] = assign({}, this.timelines[payload.id], payload.updates);
    this.emit('change');
  },

  _nextTimelineId() {
    return (new Date() + Math.floor(Math.random() * 999999)).toString(36);
  }
});

module.exports = TimelineStore;
