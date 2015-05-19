const React = require('react');
const ReactPropTypes = React.PropTypes;
const moment = require('moment');

const NewTimelineForm = React.createClass({
  propTypes: {
    onFormSubmit: ReactPropTypes.func,
    onFormCancel: ReactPropTypes.func,
    item: ReactPropTypes.object
  },
  getInitialState() {
    let date = '';
    if (this.props.item && this.props.item.date) {
      date = moment(this.props.item.date).format('YYYY-MM-DD');
    }
    return {
      date: date,
      text: (this.props.item && this.props.item.text) || ''
    };
  },
  _onSubmit(e) {
    e.preventDefault();

    const id = (new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const objectDate = moment(this.state.date).toDate();

    this.props.onFormSubmit({objectId: id, date: objectDate, text: this.state.text});

    this.setState({
      date: '',
      text: ''
    });
  },
  _onDateChange(e) {
    this.setState({
      date: e.target.value
    });
  },
  _onTextChange(e) {
    this.setState({
      text: e.target.value
    });
  },
  _onCancelClick(e) {
    e.preventDefault();
    this.props.onFormCancel();
  },
  render() {
    let buttons;
    if (this.props.item) {
      buttons = (
        <div>
          <button onClick={this._onCancelClick}>Cancel</button>
          <button type='submit'>Save change</button>
        </div>
      );
    } else {
      buttons = (
        <button type='submit'>Post</button>
      );
    }
    return (
      <form onSubmit={this._onSubmit}>
        <input ref='date' type='text' placeholder='Date' onChange={this._onDateChange} value={this.state.date} />
        <br />
        <textarea ref='text' placeholder='Type something...' onChange={this._onTextChange} value={this.state.text} />
        <br />
        {buttons}
      </form>
    );
  }
});

module.exports = NewTimelineForm;
