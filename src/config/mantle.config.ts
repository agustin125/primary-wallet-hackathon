export const MANTLE_CONFIG = {
  network: process.env.MANTLE_NETWORK || 'testnet',
  providerUrl: process.env.MANTLE_PROVIDER || 'https://rpc.sepolia.mantle.xyz',
  privateKey: process.env.MANTLE_PRIVATE_KEY,
  tokenAddress: process.env.MANTLE_TOKEN_ADDRESS || '0x22bdEdEa0beBdD7CfFC95bA53826E55afFE9DE04',
  tokenDecimals:process.env.MANTLE_TOKEN_DECIMALS ?  Number (process.env.MANTLE_TOKEN_DECIMALS) : 18,
  defaultUserAddressTo: "0xd9E75A85a8F6Fa7aC9a3f8BB6C5429C8B70Eb3D2",
  defautUserNameTo: "#tim",
};