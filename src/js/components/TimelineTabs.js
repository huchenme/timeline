import React, {PropTypes} from 'react';

export default React.createClass({
  propTypes: {
    activeTab: PropTypes.string.isRequired
  },

  render() {
    return (
      <div>
        {this.props.activeTab}
      </div>
    );
  }
});
