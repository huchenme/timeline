import React from 'react';

import TimelineForm from 'components/TimelineForm';
import TimelineList from 'components/TimelineList';
import TimelineStore from 'stores/TimelineStore';
import SessionStore from 'stores/SessionStore';
import TimelineActions from 'actions/TimelineActions';
import storeMixin from 'mixins/StoreMixin';

export default React.createClass({

  mixins: [storeMixin(TimelineStore, SessionStore)],

  componentDidMount() {
    TimelineActions.loadTimelines();
  },

  getStateFromStores() {
    return {
      list: TimelineStore.getAllItems(),
      appStatus: TimelineStore.getAppStatus(),
      createStatus: TimelineStore.getCreateStatus(),
      isLoggedIn: SessionStore.isLoggedIn(),
    };
  },

  render() {
    let newForm;
    if (this.state.isLoggedIn) {
      newForm = (
        <div>
          <TimelineForm onFormSubmit={this._onNewTimelineSubmit} />
          form status: {this.state.createStatus}
        </div>
      );
    }
    return (
      <div>
        <a href='http://huchen.me'>Hu Chen</a>
        {newForm}
        <br />
        Load timelines status: {this.state.appStatus}
        <br />
        <TimelineList list={this.state.list} />
      </div>
    );
  },

  _onNewTimelineSubmit(item) {
    TimelineActions.addItem(item);
  },
});
