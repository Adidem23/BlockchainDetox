/** @type import('hardhat/config').HardhatUserConfig */


require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')

const key="161f0963f0df357b25cacba11c4bd01102c06aee77d712ddc9ef6b37338d3761";

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/qjPrGwmSn-UBVvXEizJQAYjNFyEBeKUP",
      accounts: [`${key}`]
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
