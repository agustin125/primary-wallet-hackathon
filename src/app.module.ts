import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SmsModule } from './modules/sms/sms.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
// import { AiValidationModule } from './modules/ai-validation/ai-validation.module'; // 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule, // Required for external APIs like SMS or CoinAPI
    SmsModule,
    TransactionsModule,
    // AiValidationModule, // (optional: add later)
  ],
})
export class AppModule {}
