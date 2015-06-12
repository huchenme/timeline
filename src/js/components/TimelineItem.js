import React, {PropTypes} from 'react';
import TimelineForm from 'js/components/TimelineForm';
import moment from 'moment';
import marked from 'marked';

export default React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isEditing: false
    };
  },

  _onClickEdit(e) {
    e.preventDefault();
    console.log('edit');
    this.setState({isEditing: true});
  },

  _onClickDelete(e) {
    e.preventDefault();
    console.log('delete');
    if (confirm('Are you sure?')) {
      console.log('deleted');
    }
  },

  _onSave(item) {
    console.log(item);
    this.setState({isEditing: false});
  },

  _onCancel() {
    this.setState({isEditing: false});
  },

  render() {
    const rawMarkup = marked(this.props.item.text, {sanitize: true});
    let input, item;
    if (this.state.isEditing) {
      input = (
        <TimelineForm
          onFormSubmit={this._onSave}
          onFormCancel={this._onCancel}
          item={this.props.item} />
      );
    } else {
      item = (
        <div>
          <p>{moment(this.props.item.date).format('YYYY 年 M 月 D 日')}</p>
          <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
          <a href='#' onClick={this._onClickEdit}>Edit</a>
          <a href='#' onClick={this._onClickDelete}>Delete</a>
        </div>
      );
    }
    return (
      <div>
        {input}
        {item}
      </div>
    );
  }
});
