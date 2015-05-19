const React = require("react");
const moment = require("moment");

const NewTimelineForm = React.createClass({
  render () {
    return (
      <form onSubmit={this._onSubmit}>
        <input ref="date" type="text" placeholder="Date" />
        <br />
        <textarea ref="text" placeholder="Type something..." />
        <br />
        <button type="submit">submit</button>
      </form>
    );
  },
  _onSubmit (e) {
    e.preventDefault();

    var date = React.findDOMNode(this.refs.date).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var isoDate = moment(date).toISOString();

    this.props.onFormSubmit({objectId: id, date: isoDate, text: text});

    React.findDOMNode(this.refs.date).value = '';
    React.findDOMNode(this.refs.text).value = '';
  }
});

module.exports = NewTimelineForm;