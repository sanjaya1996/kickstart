import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x43B1d1aD9d5EE9bE7AE6EbB30744a82e3753F8a1'
);

export default instance;
