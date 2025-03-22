export const STELLAR_CONFIG = {
  network: process.env.STELLAR_NETWORK || 'testnet',
  providerUrl: process.env.STELLAR_PROVIDER || 'https://horizon-testnet.stellar.org',
  privateKey: process.env.STELLAR_PRIVATE_KEY,
};