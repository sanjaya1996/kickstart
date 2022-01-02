import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

class Layout extends Component {
  render() {
    return (
      <Container>
        <Head>
          <link
            async
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css'
          />
        </Head>
        <Header />
        {this.props.children}
        <h1> This is footer </h1>
      </Container>
    );
  }
}
export default Layout;
