import React, {PropTypes} from 'react';

export default React.createClass({
  propTypes: {
    tab: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
  },

  render() {
    return (
      <a onClick={this._onClick}>{this.props.tab}</a>
    );
  },

  _onClick(e) {
    e.preventDefault();
    this.props.onTabClick(this.props.tab);
  },
});
