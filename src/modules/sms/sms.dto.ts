import { ApiProperty } from '@nestjs/swagger';

export class SendSmsDto {
  @ApiProperty({ example: '54123456789' })
  to: string;

  @ApiProperty({ example: 'Hello from WalletApp!' })
  message: string;
}

export class ReceiveSmsDto {
  @ApiProperty({ example: '54123456789' })
  msisdn: string;

  @ApiProperty({ example: 'Incoming SMS content' })
  text: string;
}
