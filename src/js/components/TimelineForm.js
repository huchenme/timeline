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
      text: (this.props.item && this.props.item.text) || '',
      dateError: null,
      textError: null
    };
  },
  _onSubmit(e) {
    e.preventDefault();
    const id = (new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let dateError, textError;
    if(this.state.text.trim() === '') {
      textError = 'empty text';
      console.log('empty text');
    } else {
      textError = null;
    }
    if(this.state.date.trim() === '') {
      dateError = 'empty date';
      console.log('empty date');
    } else if(!this._isValidDate(this.state.date.trim())) {
      dateError = 'invalid date';
      console.log('invalid date');
    } else {
      dateError = null;
    }
    this.setState({
      dateError: dateError,
      textError: textError
    });
    if(dateError === null && textError === null) {
      const objectDate = moment(this.state.date).toDate();
      this.props.onFormSubmit({objectId: id, date: objectDate, text: this.state.text});
      this.setState({
        date: '',
        text: ''
      });
    }
  },
  _isValidDate(text) {
    return /^\d{4}-\d{2}-\d{2}$/.test(text) && moment(text).isValid();
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
