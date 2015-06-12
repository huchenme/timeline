import React, {PropTypes} from 'react';
import TimelineItem from 'js/components/TimelineItem';
import TimelineTabs from 'js/components/TimelineTabs';
import {Tabs} from 'js/constants/AppConstants';

export default React.createClass({
  propTypes: {
    list: PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      activeTab: Tabs.ALL
    };
  },

  render() {
    return (
      <div>
        <TimelineTabs activeTab={this.state.activeTab} />
        {this.props.list.map( item =>
          <TimelineItem key={item.objectId} item={item} />
        )}
      </div>
    );
  }
});
