import React from 'react';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  _onClick() {
    this.transitionTo('/');
  },

  render() {
    return (
      <div>
        <a onClick={this._onClick}>Login</a>
      </div>
    );
  }
});
