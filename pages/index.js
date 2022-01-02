import React from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends React.Component {
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log('Campaigns: ', campaigns);
  }

  render() {
    return <h1>This is the Campaign list page</h1>;
  }
}
export default CampaignIndex;
