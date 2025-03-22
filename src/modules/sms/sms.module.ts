import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { MessageIdStoreService } from './services/message-id-store.service';

@Module({
  controllers: [SmsController],
  providers: [SmsService, MessageIdStoreService],
  exports: [SmsService, MessageIdStoreService]
})
export class SmsModule {}