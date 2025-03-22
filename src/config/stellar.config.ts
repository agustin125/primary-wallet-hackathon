export const STELLAR_CONFIG = {
  network: process.env.STELLAR_NETWORK || 'testnet',
  horizonUrl: process.env.STELLAR_NETWORK || 'https://horizon-testnet.stellar.org',
  secretKey: process.env.STELLAR_SECRET_KEY,
};