const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider({ gasLimit: 10000000 }));

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[1], gas: '10000000' });

  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '10000000' });

  [campaignAddress] = await factory.methods
    .getDeployedCampaigns()
    .call({ from: accounts[0] });
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', () => {
  it('deploys a factory and campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it('allows people to contributre money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    let result;
    try {
      await campaign.methods.contribute().send({
        value: '99',
        from: accounts[1],
      });
      result = 'success';
    } catch (err) {
      result = 'fail';
    }

    assert.equal(result, 'fail');
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '10000000',
      });

    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, 'Buy batteries');
  });
});
