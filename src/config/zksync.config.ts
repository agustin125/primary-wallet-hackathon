export const ZKSYYNC_CONFIG = {
  network: process.env.ZKSYYNC_NETWORK || 'testnet',
  providerUrl: process.env.ZKSYYNC_PROVIDER || 'https://sepolia.era.zksync.dev',
  privateKey: process.env.ZKSYYNC_PRIVATE_KEY,
  tokenAddress: process.env.ZKSYYNC_TOKEN_ADDRESS || '0xAe045DE5638162fa134807Cb558E15A3F5A7F853',
  tokenDecimals:process.env.ZKSYYNC_TOKEN_DECIMALS ?  Number (process.env.ZKSYYNC_TOKEN_DECIMALS) : 6,
  defaultUserAddressTo: "0xd9E75A85a8F6Fa7aC9a3f8BB6C5429C8B70Eb3D2",
  defautUserNameTo: "#tim",
};