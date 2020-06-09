//deploy.js
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider(
  'second actor venue wreck easily prison brain anger prison card bicycle model',
  'https://rinkeby.infura.io/v3/b93d91e7f1d442f28e9d8536b47e0b44'
);
const web3 = new Web3(provider);


const deploy = async () => {



     const accounts = await web3.eth.getAccounts();
console.log('Attempting to deploy from account', accounts[0]);
const result = await new web3.eth.Contract(JSON.parse(interface))
 .deploy({ data: '0x' + bytecode})
 .send({ gas: '4000000', from: accounts[0] });
console.log('Contract deployed to', result.options.address);




};




deploy();