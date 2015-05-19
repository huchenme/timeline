const React = require('react');
const NewTimelineForm = require('js/components/NewTimelineForm');
const TimelineList = require('js/components/TimelineList');

const timelineData = [
  {
    objectId: '5548d3f1e4b03fd83456cdf1',
    text: 'this is *some* markdown 2',
    date: '2014-12-31T16:00:00.000Z'
  },
  {
    objectId: '5548d3f1e4b03fd83456cdf2',
    text: 'this is *some* markdown 2',
    date: '2014-12-30T16:00:00.000Z'
  },
  {
    objectId: '5548d3f1e4b03fd83456cdf3',
    text: 'this is *some* markdown 3',
    date: '2014-11-30T16:00:00.000Z'
  }
];

const App = React.createClass({
  getInitialState() {
    return {
      timeline: timelineData
    };
  },
  render() {
    return (
      <div>
        <NewTimelineForm onFormSubmit={this.onNewTimelineSubmit} />
        <br />
        <TimelineList timeline={this.state.timeline} />
      </div>
    );
  },
  onNewTimelineSubmit(item) {
    const oldTimeline = this.state.timeline;
    const newTimeline = oldTimeline.concat([item]);
    this.setState({timeline: newTimeline});
  }
});

module.exports = App;
