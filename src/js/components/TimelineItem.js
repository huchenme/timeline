import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import moment from 'moment';
import marked from 'marked';

import TimelineForm from 'js/components/TimelineForm';
import TimelineActions from 'js/actions/TimelineActions';

marked.setOptions({
  sanitize: true
});

export default React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    item: PropTypes.instanceOf(Map).isRequired
  },

  getInitialState() {
    return {
      isEditing: false
    };
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

  render() {
    let item = this.props.item;
    const rawMarkup = marked(item.get('text'));
    let inputNode, itemNode;
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
          <a href='#' onClick={this._onClickEdit}>Edit</a>
          <a href='#' onClick={this._onClickDelete}>Delete</a>
        </div>
      );
    }
    return (
      <div>
        {inputNode}
        {itemNode}
      </div>
    );
  }
});
