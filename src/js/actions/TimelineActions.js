import {Actions} from 'js/constants/AppConstants';

export default {
  addItem(item) {
    this.dispatch(Actions.ADD_TIMELINE, {item});
  },

  updateItem(id, item) {
    this.dispatch(Actions.UPDATE_TIMELINE, {id, item});
  },

  deleteItem(id) {
    this.dispatch(Actions.DELETE_TIMELINE, {id});
  }
};

