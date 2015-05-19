const React = require('react');
const ReactPropTypes = React.PropTypes;

const TimelineTabs = React.createClass({
  propTypes: {
    activeTab: ReactPropTypes.string.isRequired
  },
  render() {
    return (
      <div>
        {this.props.activeTab}
      </div>
    );
  }
});

module.exports = TimelineTabs;
