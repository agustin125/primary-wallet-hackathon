export const ZKSYYNC_CONFIG = {
  network: process.env.ZKSYYNC_NETWORK || 'testnet',
  providerUrl: process.env.ZKSYYNC_PROVIDER || 'https://sepolia.era.zksync.dev',
  privateKey: process.env.ZKSYYNC_PRIVATE_KEY,
};