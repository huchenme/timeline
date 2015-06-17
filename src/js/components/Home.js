import React from 'react';

import TimelineForm from 'js/components/TimelineForm';
import TimelineList from 'js/components/TimelineList';
import TimelineStore from 'js/stores/TimelineStore';
import SessionStore from 'js/stores/SessionStore';
import TimelineActions from 'js/actions/TimelineActions';
import StoreMixin from 'js/mixins/StoreMixin';

export default React.createClass({

  mixins: [StoreMixin(TimelineStore, SessionStore)],

  componentDidMount() {
    TimelineActions.loadTimelines();
  },

  getStateFromStores() {
    return {
      list: TimelineStore.getAllItems(),
      appStatus: TimelineStore.getAppStatus(),
      isLoggedIn: SessionStore.isLoggedIn()
    };
  },

  _onNewTimelineSubmit(item) {
    TimelineActions.addItem(item);
  },

  render() {
    let newForm;
    if(this.state.isLoggedIn) {
      newForm = <TimelineForm onFormSubmit={this._onNewTimelineSubmit} />;
    }
    return (
      <div>
        {newForm}
        <br />
        {this.state.appStatus}
        <br />
        <TimelineList list={this.state.list} />
      </div>
    );
  }
});
