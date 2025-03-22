export const MANTLE_CONFIG = {
  network: process.env.MANTLE_NETWORK || 'testnet',
  providerUrl: process.env.MANTLE_PROVIDER || 'https://rpc.mantle.xyz',
  privateKey: process.env.MANTLE_PRIVATE_KEY,
};