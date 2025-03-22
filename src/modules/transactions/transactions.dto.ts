import { ApiProperty } from '@nestjs/swagger';

export class TransferTokenDto {
  @ApiProperty({ example: '100' })
  amount: string;

  @ApiProperty({ example: 'USDT' })
  assetCode: string;

  @ApiProperty({ example: 'GXXXXXXXXXXXXXXXXXXXX' })
  destination: string;
}

export class WebhookTransferDto {
  @ApiProperty({ example: 'text', description: 'Type of the message' })
  message_type?: string;

  @ApiProperty({ example: '2 @tim zksync', description: 'Text content of the message' })
  text: string;

  @ApiProperty({ example: '54123456789', description: 'Sender phone number' })
  from: string;

  @ApiProperty({ example: '12077695744', description: 'Recipient phone number' })
  to: string;
}