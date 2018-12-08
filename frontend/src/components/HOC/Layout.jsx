import React, { Component } from "react";

class Layout extends Component {
  render() {
    return <div className="App">{this.props.children}</div>;
  }
}

export default Layout;
