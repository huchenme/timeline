const React = require("react");

require("css/components/header");

const Header = React.createClass({
  render () {
    return (
      <div>
        <div className="tl-Header">
          Header
        </div>
      </div>
    );
  }
});

module.exports = Header;