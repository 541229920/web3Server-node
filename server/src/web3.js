const { Web3 } = require('web3')

const Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/63b9f047b0ea4006ab1ae11771fde92f')

const web3 = new Web3(Provider)
const address = '0x614a8538927CDD5e4117c5814aE3818001041ea9'

web3.eth.getTransactionCount(address).then(count => {
    console.log(`Address ${address} has performed ${count} transactions`);
});

web3.eth.getTransactions({address: address})
.then(transactions => {
  console.log(`Address ${address} has ${transactions.length} transactions:`);
  console.log(transactions); 
});

console.log(web3)