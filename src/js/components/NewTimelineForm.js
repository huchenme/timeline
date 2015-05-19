const React = require('react');
const moment = require('moment');

const NewTimelineForm = React.createClass({
  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <input ref='date' type='text' placeholder='Date' />
        <br />
        <textarea ref='text' placeholder='Type something...' />
        <br />
        <button type='submit'>submit</button>
      </form>
    );
  },
  _onSubmit(e) {
    e.preventDefault();

    const formDate = React.findDOMNode(this.refs.date).value.trim();
    const formText = React.findDOMNode(this.refs.text).value.trim();

    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const isoDate = moment(formDate).toISOString();

    this.props.onFormSubmit({objectId: id, date: isoDate, text: formText});

    React.findDOMNode(this.refs.date).value = '';
    React.findDOMNode(this.refs.text).value = '';
  }
});

module.exports = NewTimelineForm;
