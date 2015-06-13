import React, {PropTypes} from 'react';
import moment from 'moment';
import {Map} from 'immutable';

require('css/components/TimelineForm');

export default React.createClass({
  propTypes: {
    onFormSubmit: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func,
    item: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    let date = '';
    if (this.props.item && this.props.item.get('date')) {
      date = this.props.item.get('date').format('YYYY-MM-DD');
    } else {
      date = moment().format('YYYY-MM-DD');
    }
    return {
      date: date,
      text: (this.props.item && this.props.item.get('text')) || '',
      dateError: null,
      textError: null
    };
  },

  _onSubmit(e) {
    e.preventDefault();
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
      const objectDate = moment(this.state.date);
      this.props.onFormSubmit(Map({date: objectDate, text: this.state.text}));
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
    this.setState({date: e.target.value});
  },

  _onTextChange(e) {
    this.setState({text: e.target.value});
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
      <form className='tl-TimelineForm' onSubmit={this._onSubmit}>
        <div className='tl-TimelineForm-date'>
          <input
            className='tl-TimelineForm-dateInput'
            ref='date'
            type='text'
            placeholder='日期 YYYY-MM-DD'
            onChange={this._onDateChange}
            value={this.state.date} />
        </div>
        <div className='tl-TimelineForm-text'>
          <textarea
            className='tl-TimelineForm-textInput'
            ref='text'
            placeholder='Type something...'
            onChange={this._onTextChange}
            value={this.state.text} />
        </div>
        {buttons}
      </form>
    );
  }
});
