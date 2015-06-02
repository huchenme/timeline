const React = require('react');
const ReactPropTypes = React.PropTypes;
const TimelineItem = require('js/components/TimelineItem');
const TimelineTabs = require('js/components/TimelineTabs');
const AppConstants = require('js/constants/AppConstants');

const TimelineList = React.createClass({
  propTypes: {
    list: ReactPropTypes.object.isRequired
  },
  getInitialState() {
    return {
      activeTab: AppConstants.tabs.ALL
    };
  },
  render() {
    let timelineNodes = [];
    for (const key in this.props.list) {
      timelineNodes.push(<TimelineItem key={key} item={this.props.list[key]} />);
    }
    return (
      <div>
        <TimelineTabs activeTab={this.state.activeTab} />
        {timelineNodes}
      </div>
    );
  }
});

module.exports = TimelineList;
