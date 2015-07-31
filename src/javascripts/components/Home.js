import React from 'react';

import TimelineForm from 'components/TimelineForm';
import TimelineList from 'components/TimelineList';
import TimelineStore from 'stores/TimelineStore';
import SessionStore from 'stores/SessionStore';
import TimelineActions from 'actions/TimelineActions';
import storeMixin from 'mixins/StoreMixin';
import {ASYNC_REQUEST_STATUS} from 'constants/AppConstants';

import 'components/Home.scss';

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
        <div className="Home__new-form">
          <TimelineForm onFormSubmit={this._onNewTimelineSubmit} />
          form status: {this.state.createStatus}
          <hr />
        </div>
      );
    }
    let loading;
    if (this.state.appStatus == ASYNC_REQUEST_STATUS.REQUESTING ) {
      loading = (
        <div className='Home__loading'>
          <div className="mdl-spinner mdl-js-spinner is-active"></div>
        </div>
      )
    }
    return (
      <div className='Home mdl-color--grey-100'>
        <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--overlay-drawer-button'>
          <header className="mdl-layout__header mdl-color--primary">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">Timeline</span>
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">胡辰</span>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="http://huchen.me/about">About</a>
              <a className="mdl-navigation__link" href="/">Timeline</a>
              <a className="mdl-navigation__link" href="http://huchen.me/project">Project</a>
              <a className="mdl-navigation__link" href="http://huchen.me/contact">Contact</a>
            </nav>
          </div>
          {newForm}
          {loading}
          <main className="mdl-layout__content">
            <div className="Home__content">
              <TimelineList list={this.state.list} />
            </div>
          </main>
        </div>
      </div>
    );
  },

  _onNewTimelineSubmit(item) {
    TimelineActions.addItem(item);
  },
});
