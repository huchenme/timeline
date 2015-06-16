import React, {PropTypes} from 'react';
import {OrderedMap} from 'immutable';

import TimelineItem from 'js/components/TimelineItem';
import TimelineTab from 'js/components/TimelineTab';
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

  getList() {
    switch(this.state.activeTab) {
      case TABS.FEATURED:
        return this.props.list.filter(item => item.get('featured'));
      default:
        return this.props.list;
    }
  },

  onChangeTab(newTab) {
    if(newTab !== this.state.activeTab) {
      this.setState({activeTab: newTab});
    }
  },

  render() {
    const list = this.getList();
    return (
      <div>
        <div>
          <TimelineTab tab={TABS.ALL} onTabClick={this.onChangeTab} />
          <TimelineTab tab={TABS.FEATURED} onTabClick={this.onChangeTab} />
        </div>
        {list.map((value, key) =>
          <TimelineItem key={key} id={key} item={value} />
        )}
      </div>
    );
  }
});
