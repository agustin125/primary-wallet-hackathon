import { ApiProperty } from '@nestjs/swagger';

export class TransferTokenDto {
  @ApiProperty({ example: '100' })
  amount: string;

  @ApiProperty({ example: 'USDT' })
  assetCode: string;

  @ApiProperty({ example: 'GXXXXXXXXXXXXXXXXXXXX' })
  destination: string;
}