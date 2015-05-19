const React = require('react');
const TimelineItem = require('js/components/TimelineItem');

const TimelineList = React.createClass({
  render() {
    const timelineNodes = this.props.timeline.map(function(item) {
      return (
        <TimelineItem
          key={item.objectId}
          date={item.date}
          text={item.text} />
      );
    });
    return (
      <div>
        {timelineNodes}
      </div>
    );
  }
});

module.exports = TimelineList;
