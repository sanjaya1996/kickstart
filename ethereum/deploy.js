require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  process.env.MNEMONIC_PHRASE,
  process.env.PROVIDER_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  // Address: 0xF80E70D275160D2c0aBbE176DB5Ef81C1dc2529C

  provider.engine.stop();
};
deploy();
