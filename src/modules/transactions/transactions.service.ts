import { Injectable } from '@nestjs/common';
import { BlockchainProvider } from '../../types/enums';
import { BlockchainProviderResolver } from '../../providers/provider-resolver';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly providerResolver: BlockchainProviderResolver,
  ) {}

  async transferToken(
    amount: string,
    assetCode: string,
    destination: string,
    network: BlockchainProvider = BlockchainProvider.Stellar,
  ): Promise<string> {
    const provider = this.providerResolver.resolve(network);
    return provider.transferToken(amount, assetCode, destination);
  }
}
