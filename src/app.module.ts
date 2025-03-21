import { Module } from '@nestjs/common';
import { SmsController } from './modules/sms/sms.controller';
import { SmsService } from './modules/sms/sms.service';

@Module({
  controllers: [SmsController],
  providers: [SmsService],
})
export class AppModule {}
