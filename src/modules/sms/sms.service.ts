import { Injectable } from '@nestjs/common';
import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SmsService {
  private vonage: Vonage;

  constructor() {
    const credentials = new Auth({
      apiKey: process.env.VONAGE_API_KEY,
      apiSecret: process.env.VONAGE_API_SECRET,
    });
    this.vonage = new Vonage(credentials);
  }

  async sendSms(to: string, message: string): Promise<void> {
    await this.vonage.sms.send({
      to,
      from: process.env.VONAGE_SENDER || 'WalletApp',
      text: message,
    });
  }

  async receiveSms(from: string, text: string): Promise<void> {
    console.log(`📩 SMS received from ${from}: ${text}`);
    await this.sendSms(from, 'Your message has been received ✅');
  }
}