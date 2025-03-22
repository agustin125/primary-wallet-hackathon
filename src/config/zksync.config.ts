export const ZKSYYNC_CONFIG = {
  network: process.env.ZKSYYNC_NETWORK || 'testnet',
  horizonUrl: process.env.ZKSYYNC_NETWORK || 'https://horizon-testnet.ZKSYYNC.org',
  secretKey: process.env.ZKSYYNC_SECRET_KEY,
};