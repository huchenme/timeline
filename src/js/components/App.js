import React from 'react';
import TimelineForm from 'js/components/TimelineForm';
import TimelineList from 'js/components/TimelineList';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
const FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('TimelineStore')],

  getStateFromFlux() {
    const flux = this.getFlux();
    return {
      list: flux.store('TimelineStore').getItems()
    };
  },

  _onNewTimelineSubmit(item) {
    const oldTimeline = this.state.list;
    const newTimeline = oldTimeline.concat([item]);
    this.setState({list: newTimeline});
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
