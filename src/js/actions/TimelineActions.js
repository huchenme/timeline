import {TIMELINE_ACTIONS} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';

export default {
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.ADD_TIMELINE,
      item: item
    });
  },

  updateItem(id, item) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.UPDATE_TIMELINE,
      id: id,
      item: item
    });
  },

  deleteItem(id) {
    AppDispatcher.dispatch({
      actionType: TIMELINE_ACTIONS.DELETE_TIMELINE,
      id: id
    });
  }
};
