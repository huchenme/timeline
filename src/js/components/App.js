/*global __DEV__*/
const React = require('react');
const TimelineForm = require('js/components/TimelineForm');
const TimelineList = require('js/components/TimelineList');

const timelineData = require('data/timelines');

const App = React.createClass({
  getInitialState() {
    return {
      list: timelineData
    };
  },
  _onNewTimelineSubmit(item) {
    const oldTimeline = this.state.list;
    const newTimeline = oldTimeline.concat([item]);
    this.setState({list: newTimeline});
  },
  render() {
    if (__DEV__) {
      console.log('js source map');
    }
    return (
      <div>
        <TimelineForm onFormSubmit={this._onNewTimelineSubmit} />
        <br />
        <TimelineList list={this.state.list} />
      </div>
    );
  }
});

module.exports = App;
