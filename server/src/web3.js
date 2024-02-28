const Web3 = require('web3')

// const web3 = new Web3('https://mainnet.infura.io/v3/63b9f047b0ea4006ab1ae11771fde92f')
const address = '0x614a8538927CDD5e4117c5814aE3818001041ea9'


Web3.eth.getBlockTransactionCount(address,'latest').then(trans=>{
const transCount = trans - 1
console.log(transCount)
// Web3.eth.getTransaction()
})


// web3.({
//     address: address,
//     fromBlock: 0,
//     toBlock: 'latest'
// }).then((trans) => {
//     console.log(trans[0])
// })
