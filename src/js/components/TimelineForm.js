import React, {PropTypes} from 'react';
import moment from 'moment';
import {Map, List} from 'immutable';

require('css/components/TimelineForm');

const MAX_IMAGES = 2;

export default React.createClass({
  propTypes: {
    onFormSubmit: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func,
    item: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    const item = this.props.item;
    let date = '';
    if (item && item.get('date')) {
      date = item.get('date').format('YYYY-MM-DD');
    } else {
      date = moment().format('YYYY-MM-DD');
    }
    return {
      date: date,
      text: (item && item.get('text')) || '',
      featured: (item && item.get('featured')) || false,
      images: (item && item.get('images')) || List(),
      dateError: null,
      textError: null
    };
  },

  _onSubmit(e) {
    e.preventDefault();
    let dateError, textError;
    const textInput = this.state.text;
    const dateInput = this.state.date;
    if(textInput.trim() === '') {
      textError = 'empty text';
      console.log('empty text');
    } else {
      textError = null;
    }
    if(dateInput.trim() === '') {
      dateError = 'empty date';
      console.log('empty date');
    } else if(!this._isValidDate(dateInput.trim())) {
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
      const objectDate = moment(dateInput);
      this.props.onFormSubmit(Map({
        date: objectDate,
        text: textInput,
        featured: this.state.featured,
        images: this.state.images.filterNot(image => image.trim() === '')
      }));
      this.setState({
        date: moment().format('YYYY-MM-DD'),
        text: '',
        featured: false,
        images: List()
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

  _onFeauturedChange() {
    this.setState({featured: !this.state.featured});
  },

  _onCancelClick(e) {
    e.preventDefault();
    this.props.onFormCancel();
  },

  _onAddImage(e) {
    e.preventDefault();
    if(this.state.images.size < MAX_IMAGES) {
      this.setState({images: this.state.images.push('')});
    }
  },

  _onRemoveImage(index, e) {
    e.preventDefault();
    this.setState({images: this.state.images.remove(index)});
  },

  _onImageChange(index, e) {
    e.preventDefault();
    this.setState({images: this.state.images.set(index, e.target.value.trim())});
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
    let addImageButton;
    if (this.state.images.size < MAX_IMAGES) {
      addImageButton = <button onClick={this._onAddImage}>Add Image</button>;
    }
    return (
      <form className='tl-TimelineForm' onSubmit={this._onSubmit}>
        <div className='tl-TimelineForm-date'>
          <input
            className='tl-TimelineForm-dateInput'
            type='text'
            placeholder='日期 YYYY-MM-DD'
            onChange={this._onDateChange}
            value={this.state.date} />
        </div>
        <div className='tl-TimelineForm-text'>
          <textarea
            className='tl-TimelineForm-textInput'
            placeholder='Type something...'
            onChange={this._onTextChange}
            value={this.state.text} />
        </div>
        <div>
          <label>
            <input type='checkbox'
              checked = {this.state.featured}
              onChange={this._onFeauturedChange} />
            Featured
          </label>
          {addImageButton}
        </div>
        <div>
          <ul>
            {this.state.images.map((image, index) =>
              <li key={index}>
                <input
                  type='text'
                  placeholder='image url'
                  onChange={this._onImageChange.bind(this, index)}
                  value={image} />
                <button onClick={this._onRemoveImage.bind(this, index)}>x</button>
              </li>
            )}
          </ul>
        </div>
        {buttons}
      </form>
    );
  }
});
