const React = require('react');
const moment = require('moment');
const marked = require('marked');
moment.locale('zh-CN');

const TimelineItem = React.createClass({
  render() {
    const rawMarkup = marked(this.props.text, {sanitize: true});
    return (
      <div>
        <p>{moment(this.props.date).format('MMMDo')}</p>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

module.exports = TimelineItem;
