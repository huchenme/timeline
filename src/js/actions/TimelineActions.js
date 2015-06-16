import {TimelineActions} from 'js/constants/AppConstants';
import AppDispatcher from 'js/dispatcher/AppDispatcher';

export default {
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: TimelineActions.ADD_TIMELINE,
      item: item
    });
  },

  updateItem(id, item) {
    AppDispatcher.dispatch({
      actionType: TimelineActions.UPDATE_TIMELINE,
      id: id,
      item: item
    });
  },

  deleteItem(id) {
    AppDispatcher.dispatch({
      actionType: TimelineActions.DELETE_TIMELINE,
      id: id
    });
  }
};
