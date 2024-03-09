const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
    apiKey: "uKYL0eHehuzVrQz6_a_g4mSyaG_71_cg",
    Network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

const latestBlock = alchemy.core.getBlockNumber();
const address = '0x614a8538927CDD5e4117c5814aE3818001041ea9'
const fromBlock = 'latest-10000' // 从最新的10000个区块之前开始查询
const toBlock = 'latest'

const transfers = alchemy.core
    .getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: address,
        excludeZeroValue: true,
        category: ['erc20']
    })
    .then(console.log);

console.log(transfers)