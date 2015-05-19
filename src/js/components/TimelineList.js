const React = require('react');
const ReactPropTypes = React.PropTypes;
const TimelineItem = require('js/components/TimelineItem');
const TimelineTabs = require('js/components/TimelineTabs');
const AppConstants = require('js/constants/AppConstants');

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
    const timelineNodes = this.props.list.map(function(item) {
      return (
        <TimelineItem
          key={item.objectId}
          item={item} />
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
