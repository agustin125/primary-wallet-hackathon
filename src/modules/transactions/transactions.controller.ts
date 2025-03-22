import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TransferTokenDto, WebhookTransferDto } from './transactions.dto';
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
  @ApiBody({ type: WebhookTransferDto })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleSmsWebhook(@Body() body: WebhookTransferDto | any): Promise<string> {
    const { text } = body;
    console.log("webhook-transfer");
    console.log(body);

    // Example text: "10 @alice zksync" OR "5 0x1234... stellar"
    const [amount, recipientRaw, networkRaw] = text.trim().split(/\s+/);
    const network = this.providerResolver.identifyNetwork(networkRaw);

    const recipientType = this.identifyRecipientType(recipientRaw);

    console.log(`Received transfer request: amount=${amount}, recipient=${recipientRaw}, type=${recipientType}, network=${network}`);

    return this.transactionsService.transferToken(amount, 'USDT', recipientRaw, network);
  }

  private identifyRecipientType(value: string): RecipientType {
    if (value.startsWith('@')) return RecipientType.Alias;
   // if (/^0x[a-fA-F0-9]{40}$/.test(value)) return RecipientType.Blockchain;
    return RecipientType.Blockchain;
  }

}
