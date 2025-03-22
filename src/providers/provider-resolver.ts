import { Injectable } from '@nestjs/common';
import { BlockchainProvider } from '../types/enums';
import { BlockchainTransferProvider } from '../interfaces/blockchain-provider.interface';
import { StellarProvider } from './stellar.provider';
import { ZkSyncProvider } from './zksync.provider';
import { MantleProvider } from './mantle.provider';

@Injectable()
export class BlockchainProviderResolver {
  private readonly providerMap: Record<BlockchainProvider, BlockchainTransferProvider>;

  constructor(
    private readonly stellar: StellarProvider,
    private readonly zksync: ZkSyncProvider,
    private readonly mantle: MantleProvider,
  ) {
    this.providerMap = {
      [BlockchainProvider.Stellar]: stellar,
      [BlockchainProvider.ZkSync]: zksync,
      [BlockchainProvider.Mantle]: mantle,
    };
  }

  resolve(network: BlockchainProvider): BlockchainTransferProvider {
    const provider = this.providerMap[network];
    if (!provider) {
      throw new Error(`Unsupported blockchain network: ${network}`);
    }
    return provider;
  }

   identifyNetwork(value: string): BlockchainProvider {
    const normalized = value.toLowerCase();
    switch (normalized) {
      case BlockchainProvider.Stellar:
        return BlockchainProvider.Stellar;
      case BlockchainProvider.ZkSync:
        return BlockchainProvider.ZkSync;
      case BlockchainProvider.Mantle:
        return BlockchainProvider.Mantle;
      default:
        throw new Error(`Unsupported network: ${value}`);
    }
  } 

  getExplorerTxUrl(txHash: string, network: BlockchainProvider): string {
    switch (network) {
      case BlockchainProvider.ZkSync:
        return `https://sepolia.explorer.zksync.io/tx/${txHash}`;
      case BlockchainProvider.Stellar:
        return `https://stellar.expert/explorer/testnet/tx/${txHash}`;
      case BlockchainProvider.Mantle:
        return `https://sepolia.mantlescan.xyz/tx/${txHash}`; 
      default:
        throw new Error(`Unsupported network for explorer URL: ${network}`);
    }
  }


}
  