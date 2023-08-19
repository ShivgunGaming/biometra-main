const Ethereum = {
  hex: '0x1',
  name: 'Ethereum',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/Vv2y0ZW2JcOHZmAUdEEuvNlUxfxHtgs5',
  ticker: 'ETH'
};

const Binance = {
  hex: '0x38',
  name: 'Binance Mainnet',
  rpcUrl: 'https://bsc-dataseed.binance.org',
  ticker: 'BNB'
};

const Avalanche = {
  hex: '0xa86a',
  name: 'Avalanche Mainnet',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  ticker: 'AVAX'
};

export const CHAINS_CONFIG = {
  '0x1': Ethereum,
  '0x38': Binance,
  '0xa86a': Avalanche,
};
