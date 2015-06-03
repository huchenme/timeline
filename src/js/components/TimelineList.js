const React = require('react');
const ReactPropTypes = React.PropTypes;
const TimelineItem = require('js/components/TimelineItem');
const TimelineTabs = require('js/components/TimelineTabs');
const AppConstants = require('js/constants/AppConstants');
const _ = require('underscore');

const TimelineList = React.createClass({
  propTypes: {
    list: ReactPropTypes.array.isRequired
  },
  getInitialState() {
    return {
      activeTab: AppConstants.tabs.ALL
    };
  },
  render() {
    let sortedList = _.sortBy(this.props.list, function(item) {
      return item.date.getTime();
    });
    console.log(sortedList);
    const timelineNodes = sortedList.map(function(item) {
      return (
        <TimelineItem key={item.objectId} item={item} />
      );
    });
    return (
      <div>
        <TimelineTabs activeTab={this.state.activeTab} />
        {timelineNodes}
      </div>
    );
  }
});

module.exports = TimelineList;
