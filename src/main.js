/*global __DEV__*/

import React from 'react';
import {Flux} from 'fluxxor';
import App from 'js/components/App';
import TimelineActions from 'js/actions/TimelineActions';
import TimelineStore from 'js/stores/TimelineStore';

const stores = {
  TimelineStore: new TimelineStore()
};

const flux = new Flux(stores, TimelineActions);

if (__DEV__) {
  flux.on('dispatch', function(type, payload) {
    console.log('[Dispatch]', type, payload);
  });
}

require('normalize.css');
require('css/base');

React.render(<App />, document.getElementById('main'));
