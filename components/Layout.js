import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

class Layout extends Component {
  render() {
    return (
      <Container>
        <Header />
        {this.props.children}
        <h1> This is footer </h1>
      </Container>
    );
  }
}
export default Layout;
