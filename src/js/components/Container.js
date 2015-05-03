const React = require("react");
const Header = require("js/components/Header");
const Footer = require("js/components/Footer");

require("sass/components/Container");

const Container = React.createClass({
  render () {
    return (
      <div className="container">
        <Header />
        <Footer />
      </div>
    );
  }
});

module.exports = Container;