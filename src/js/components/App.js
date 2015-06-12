import React from 'react';
import TimelineForm from 'js/components/TimelineForm';
import TimelineList from 'js/components/TimelineList';

const timelineData = require('data/timelines');

export default React.createClass({
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
    return (
      <div>
        <TimelineForm onFormSubmit={this._onNewTimelineSubmit} />
        <br />
        <TimelineList list={this.state.list} />
      </div>
    );
  }
});
