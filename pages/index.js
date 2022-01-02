import React from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  render() {
    return <h1>First campaign is {this.props.campaigns[0]}</h1>;
  }
}
export default CampaignIndex;
