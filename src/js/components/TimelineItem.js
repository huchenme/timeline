const React = require('react');
const ReactPropTypes = React.PropTypes;
const moment = require('moment');
const marked = require('marked');

const TimelineItem = React.createClass({
  propTypes: {
    item: ReactPropTypes.object.isRequired
  },
  _onEdit(e) {
    e.preventDefault();
    console.log('edit');
  },
  _onDelete(e) {
    e.preventDefault();
    console.log('delete');
    if (confirm('Are you sure?')) {
      console.log('deleted');
    }
  },
  render() {
    const rawMarkup = marked(this.props.item.text, {sanitize: true});
    return (
      <div>
        <p>{moment(this.props.item.date).format('YYYY 年 M 月 D 日')}</p>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <a href='#' onClick={this._onEdit}>Edit</a>
        <a href='#' onClick={this._onDelete}>Delete</a>
      </div>
    );
  }
});

module.exports = TimelineItem;
