const React = require("react");
const Header = require("js/components/Header");
const Footer = require("js/components/Footer");

require("css/components/container");
require("suitcss-utils-layout");

const Container = React.createClass({
  render () {
    return (
      <div className="tl-Container u-cf">
        <Header />
        <Footer />
      </div>
    );
  }
});

module.exports = Container;