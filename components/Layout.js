import React, { Component } from 'react';

class Layout extends Component {
  render() {
    return (
      <div>
        <h1> This is header </h1>
        {this.props.children}
        <h1> This is footer </h1>
      </div>
    );
  }
}
export default Layout;
