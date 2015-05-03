const React = require("react");

require("sass/components/Header");
require("sass/utilities/clearfix");

const Header = React.createClass({
  render () {
    return (
      <div>
        <div className="header u-clearfix">
          Header
        </div>
      </div>
    );
  }
});

module.exports = Header;