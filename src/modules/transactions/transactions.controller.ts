import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TransferTokenDto } from './transactions.dto';
import { RecipientType } from '../../types/enums';
import { BlockchainProviderResolver } from '../../providers/provider-resolver';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService,  private readonly providerResolver: BlockchainProviderResolver,) {}

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer tokens via Stellar' })
  @ApiBody({ type: TransferTokenDto })
  async transferToken(@Body() body: TransferTokenDto): Promise<string> {
    return this.transactionsService.transferToken(body.amount, body.assetCode, body.destination);
  }

  @Post('webhook-transfer')
  @ApiOperation({ summary: 'Transfer tokens from SMS webhook' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleSmsWebhook(@Body() body: any): Promise<string> {
    const { text } = body;

    // Example text: "10 @alice zksync" OR "5 0x1234... stellar"
    const [amount, recipientRaw, networkRaw] = text.trim().split(/\s+/);
    const network = this.providerResolver.identifyNetwork(networkRaw);

    const recipientType = this.identifyRecipientType(recipientRaw);
    const recipient = await this.resolveRecipient(recipientRaw, recipientType);

    console.log(`Received transfer request: amount=${amount}, recipient=${recipient}, type=${recipientType}, network=${network}`);

    return this.transactionsService.transferToken(amount, 'USDT', recipient, network);
  }

  private identifyRecipientType(value: string): RecipientType {
    if (value.startsWith('@')) return RecipientType.Alias;
    if (/^0x[a-fA-F0-9]{40}$/.test(value)) return RecipientType.Blockchain;
    return RecipientType.Bank;
  }


  private async resolveRecipient(value: string, type: RecipientType): Promise<string> {
    if (type === RecipientType.Alias) {
      const mockAliasMap = {
        '@alice': '0x1234567890abcdef1234567890abcdef12345678',
      };
      return mockAliasMap[value] || value;
    }
    if (type === RecipientType.Bank) {
      const mockBankMap = {
        'CBU12345678': '0xbankuser1234567890abcdef1234567890ab',
      };
      return mockBankMap[value] || value;
    }
    return value;
  }
}
