import React, {PropTypes} from 'react';
import {OrderedMap} from 'immutable';

import TimelineItem from 'components/TimelineItem';
import TimelineTab from 'components/TimelineTab';
import {TABS} from 'constants/AppConstants';

export default React.createClass({
  propTypes: {
    list: PropTypes.instanceOf(OrderedMap).isRequired,
  },

  getInitialState() {
    return {
      activeTab: TABS.ALL,
    };
  },

  onChangeTab(newTab) {
    if (newTab !== this.state.activeTab) {
      this.setState({activeTab: newTab});
    }
  },

  getList() {
    switch (this.state.activeTab) {
      case TABS.FEATURED:
        return this.props.list.filter(item => item.get('featured'));
      default:
        return this.props.list;
    }
  },

  render() {
    const list = this.getList();
    return (
      <div>
        {list.map((value, key) =>
          <TimelineItem key={key} id={key} item={value} />
        )}
      </div>
    );
  },
});
