const React = require('react');
// const Fluxxor = require("fluxxor");
const App = require('js/components/App');

// const stores = {
//   TodoStore: new TodoStore()
// };

// const actions = {
//   user: UserActions,
//   guest: GuestActions
// }

// const flux = new Fluxxor.Flux(stores, actions);

// if (__DEV__) {
//   flux.on("dispatch", function(type, payload) {
//     console.log("[Dispatch]", type, payload);
//   });
// }

require('normalize.css');
require('css/base');

React.render(<App />, document.getElementById('main'));
