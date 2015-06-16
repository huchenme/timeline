import React from 'react';
import Router, { Route, NotFoundRoute, DefaultRoute } from 'react-router';

import App from 'js/components/App';
import Home from 'js/components/Home';
import Login from 'js/components/Login';
import NoMatch from 'js/components/NoMatch';

require('normalize.css');
require('css/base');

const routes = (
  <Route path='/' handler={App}>
    <DefaultRoute handler={Home}/>
    <Route path='login' handler={Login}/>
    <NotFoundRoute handler={NoMatch} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

