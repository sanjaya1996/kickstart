import React from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends React.Component {
  render() {
    const { Row, Cell } = Table;
    const { id, request, address, approversCount } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')} (eth)</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
