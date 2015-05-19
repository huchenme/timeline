const React = require('react');
const ReactPropTypes = React.PropTypes;
const moment = require('moment');

const NewTimelineForm = React.createClass({
  propTypes: {
   onFormSubmit: ReactPropTypes.func.isRequired
  },
  _onSubmit(e) {
    e.preventDefault();

    const formDate = React.findDOMNode(this.refs.date).value.trim();
    const formText = React.findDOMNode(this.refs.text).value.trim();

    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const objectDate = moment(formDate).toDate();

    this.props.onFormSubmit({objectId: id, date: objectDate, text: formText});

    React.findDOMNode(this.refs.date).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
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
  }
});

module.exports = NewTimelineForm;
