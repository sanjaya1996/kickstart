import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import getCampaign from '../../../ethereum/campaign';

class RequestIndex extends React.Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = getCampaign(address);

    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
      [...Array(parseInt(requestCount)).keys()].map((_, index) =>
        campaign.methods.requests(index).call()
      )
    );

    return { address, requests, requestCount };
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
