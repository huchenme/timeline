import React, {PropTypes} from 'react';
import {OrderedMap} from 'immutable';

import TimelineItem from 'js/components/TimelineItem';
import TimelineTabs from 'js/components/TimelineTabs';
import {TABS} from 'js/constants/AppConstants';

export default React.createClass({
  propTypes: {
    list: PropTypes.instanceOf(OrderedMap).isRequired
  },

  getInitialState() {
    return {
      activeTab: TABS.ALL
    };
  },

  render() {
    const list = this.props.list;
    return (
      <div>
        <TimelineTabs activeTab={this.state.activeTab} />
        {list.map((value, key) =>
          <TimelineItem key={key} id={key} item={value} />
        )}
      </div>
    );
  }
});
