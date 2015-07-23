import React from 'react';
import Router, { Route, NotFoundRoute, DefaultRoute } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import Login from 'components/Login';
import NoMatch from 'components/NoMatch';

require('materialize');
require('base');

const routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route path="login" handler={Login}/>
    <NotFoundRoute handler={NoMatch} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
