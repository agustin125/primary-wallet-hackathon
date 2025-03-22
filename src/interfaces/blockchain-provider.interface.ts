export interface BlockchainTransferProvider {
  transferToken(amount: string, assetCode: string, destination: string): Promise<string>;
}
