import React, {PropTypes} from 'react/addons';
import moment from 'moment';
import {Map, List} from 'immutable';

require('components/TimelineForm');

const MAX_IMAGES = 2;

export default React.createClass({
  propTypes: {
    onFormSubmit: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func,
    item: PropTypes.instanceOf(Map),
  },

  mixins: [React.addons.LinkedStateMixin],

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
      images: (item && item.get('images')) || new List(),
      dateError: null,
      textError: null,
    };
  },

  render() {
    let buttons;
    if (this.props.item) {
      buttons = (
        <div>
          <a onClick={this._onCancelClick}>Cancel</a>
          <button type="submit">Save change</button>
        </div>
      );
    } else {
      buttons = (
        <button type="submit">Post</button>
      );
    }
    let addImageButton;
    if (this.state.images.size < MAX_IMAGES) {
      addImageButton = <a onClick={this._onAddImage}>Add Image</a>;
    }
    return (
      <form className="tl-TimelineForm" onSubmit={this._onSubmit}>
        <div className="tl-TimelineForm-date">
          <input
            className="tl-TimelineForm-dateInput"
            type="text"
            placeholder="日期 YYYY-MM-DD"
            valueLink={this.linkState('date')} />
        </div>
        <div className="tl-TimelineForm-text">
          <textarea
            className="tl-TimelineForm-textInput"
            placeholder="Type something..."
            valueLink={this.linkState('text')} />
        </div>
        <div>
          <label>
            <input type="checkbox"
              checkedLink={this.linkState('featured')} />
            Featured
          </label>
          {addImageButton}
        </div>
        <div>
          <ul>
            {this.state.images.map((image, index) =>
              <li key={index}>
                <input
                  type="text"
                  placeholder="image url"
                  onChange={this._onImageChange.bind(this, index)}
                  value={image} />
                <a onClick={this._onRemoveImage.bind(this, index)}>x</a>
              </li>
            )}
          </ul>
        </div>
        {buttons}
      </form>
    );
  },

  _onSubmit(e) {
    e.preventDefault();
    let dateError;
    let textError;
    const textInput = this.state.text;
    const dateInput = this.state.date;
    if (textInput.trim() === '') {
      textError = 'empty text';
      console.log('empty text');
    } else {
      textError = null;
    }
    if (dateInput.trim() === '') {
      dateError = 'empty date';
      console.log('empty date');
    } else if (!this._isValidDate(dateInput.trim())) {
      dateError = 'invalid date';
      console.log('invalid date');
    } else {
      dateError = null;
    }
    this.setState({
      dateError: dateError,
      textError: textError,
    });
    if (dateError === null && textError === null) {
      const objectDate = moment(dateInput);
      this.props.onFormSubmit(new Map({
        date: objectDate,
        text: textInput,
        featured: this.state.featured,
        images: this.state.images.filterNot(image => image.trim() === ''),
      }));
      this.setState({
        date: moment().format('YYYY-MM-DD'),
        text: '',
        featured: false,
        images: new List(),
      });
    }
  },

  _isValidDate(text) {
    return /^\d{4}-\d{2}-\d{2}$/.test(text) && moment(text).isValid();
  },

  _onCancelClick() {
    this.props.onFormCancel();
  },

  _onAddImage() {
    if (this.state.images.size < MAX_IMAGES) {
      this.setState({images: this.state.images.push('')});
    }
  },

  _onRemoveImage(index) {
    this.setState({images: this.state.images.remove(index)});
  },

  _onImageChange(index, e) {
    this.setState({images: this.state.images.set(index, e.target.value.trim())});
  },

});
