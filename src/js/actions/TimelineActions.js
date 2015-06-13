import {ACTIONS} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';

export default {
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: ACTIONS.ADD_TIMELINE,
      item: item
    });
  },

  updateItem(id, item) {
    AppDispatcher.dispatch({
      actionType: ACTIONS.UPDATE_TIMELINE,
      id: id,
      item: item
    });
  },

  deleteItem(id) {
    AppDispatcher.dispatch({
      actionType: ACTIONS.DELETE_TIMELINE,
      id: id
    });
  }
};
