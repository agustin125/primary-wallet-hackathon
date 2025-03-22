export const STELLAR_CONFIG = {
  network: process.env.STELLAR_NETWORK || 'testnet',
  providerUrl: process.env.STELLAR_PROVIDER || 'https://horizon-testnet.stellar.org',
  privateKey: process.env.STELLAR_PRIVATE_KEY,
  defaultUserAddressTo: "GCGS6U7EVZ62R4UEJEXQKTWH6GNKMY3SJNC4D6ZOLGPRBFE5GXDQAEHL",
  defautUserNameTo: "#tim",
};