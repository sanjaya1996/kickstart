import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xF80E70D275160D2c0aBbE176DB5Ef81C1dc2529C'
);

export default instance;
