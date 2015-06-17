import {Dispatcher} from 'flux';
const dispatcher = new Dispatcher();

dispatcher.register(action => {
  if(__DEV__) {
    console.log('[DISPATCHER]', action);
  }
});

export default dispatcher;

