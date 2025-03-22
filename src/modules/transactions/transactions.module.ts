import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { StellarProvider } from '../../providers/stellar.provider';
import { ZkSyncProvider } from '../../providers/zksync.provider';
import { MantleProvider } from '../../providers/mantle.provider';
import { BlockchainProviderResolver } from '../../providers/provider-resolver';
import { SmsService } from '../sms/sms.service';
import { MessageIdStoreService } from '../sms/services/message-id-store.service';
import { SmsModule } from '../sms/sms.module';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    StellarProvider,
    ZkSyncProvider,
    MantleProvider,
    BlockchainProviderResolver,
    SmsService,
  ],
  imports: [SmsModule], // 👈 importante
})
export class TransactionsModule {}