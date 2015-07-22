import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import moment from 'moment';
import marked from 'marked';

import TimelineForm from 'js/components/TimelineForm';
import TimelineActions from 'js/actions/TimelineActions';
import SessionStore from 'js/stores/SessionStore';
import storeMixin from 'js/mixins/StoreMixin';

marked.setOptions({
  sanitize: true,
});

export default React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    item: PropTypes.instanceOf(Map).isRequired,
  },

  mixins: [storeMixin(SessionStore)],

  getInitialState() {
    return {
      isEditing: false,
    };
  },

  getStateFromStores() {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
    };
  },

  render() {
    const item = this.props.item;
    const rawMarkup = marked(item.get('text'));
    let inputNode;
    let itemNode;
    let userActions;
    if (this.state.isLoggedIn) {
      userActions = (
        <div>
          <a onClick={this._onClickEdit}>Edit</a>
          <a onClick={this._onClickDelete}>Delete</a>
        </div>
      );
    }
    if (this.state.isEditing) {
      inputNode = (
        <TimelineForm
          onFormSubmit={this._onSave}
          onFormCancel={this._onCancel}
          item={item} />
      );
    } else {
      itemNode = (
        <div>
          <p>{moment(item.get('date')).format('YYYY 年 M 月 D 日')}</p>
          <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
          <p>Featured: {item.get('featured') ? 'true' : 'false'}</p>
          <ul>
            {item.get('images').map((image, index) =>
              <li key={index}>{image}</li>
            )}
          </ul>
          {userActions}
        </div>
      );
    }
    return (
      <div>
        {inputNode}
        {itemNode}
      </div>
    );
  },

  _onClickEdit(e) {
    e.preventDefault();
    this.setState({isEditing: true});
  },

  _onClickDelete(e) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      TimelineActions.deleteItem(this.props.id);
    }
  },

  _onSave(item) {
    TimelineActions.updateItem(this.props.id, item);
    this.setState({isEditing: false});
  },

  _onCancel() {
    this.setState({isEditing: false});
  },

});
