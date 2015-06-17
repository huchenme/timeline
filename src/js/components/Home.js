import React from 'react';

import TimelineForm from 'js/components/TimelineForm';
import TimelineList from 'js/components/TimelineList';
import TimelineStore from 'js/stores/TimelineStore';
import SessionStore from 'js/stores/SessionStore';
import TimelineActions from 'js/actions/TimelineActions';

function getState() {
  return {
    list: TimelineStore.getAllItems(),
    isLoggedIn: SessionStore.isLoggedIn()
  };
}

export default React.createClass({
  getInitialState() {
    return getState();
  },

  componentDidMount() {
    TimelineStore.addChangeListener(this._onChange);
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TimelineStore.removeChangeListener(this._onChange);
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getState());
  },

  _onNewTimelineSubmit(item) {
    TimelineActions.addItem(item);
  },

  render() {
    return (
      <div>
        <TimelineForm onFormSubmit={this._onNewTimelineSubmit} />
        <br />
        <TimelineList list={this.state.list} />
      </div>
    );
  }
});
