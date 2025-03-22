import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { StellarProvider } from '../../providers/stellar.provider';
import { ZkSyncProvider } from '../../providers/zksync.provider';
import { MantleProvider } from '../../providers/mantle.provider';
import { BlockchainProviderResolver } from '../../providers/provider-resolver';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    StellarProvider,
    ZkSyncProvider,
    MantleProvider,
    BlockchainProviderResolver,
  ],
})
export class TransactionsModule {}