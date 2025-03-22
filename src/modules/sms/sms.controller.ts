import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SendSmsDto, ReceiveSmsDto } from './sms.dto';

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an Notification SMS' })
  @ApiBody({ type: SendSmsDto })
  async sendNotificationSms(@Body() body: SendSmsDto): Promise<void> {
    return this.smsService.sendNotificationSms(body.to, body.message);
  }

  @Post('receive')
  @ApiOperation({ summary: 'Receive an SMS (Webhook)' })
  @ApiBody({ type: ReceiveSmsDto })
  async receiveSms(@Body() body: ReceiveSmsDto): Promise<void> {
    return this.smsService.receiveSms(body.msisdn, body.text);
  }
}