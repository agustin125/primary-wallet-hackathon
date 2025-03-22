import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TransferTokenDto, WebhookTransferDto } from './transactions.dto';
import { RecipientType } from '../../types/enums';
import { BlockchainProviderResolver } from '../../providers/provider-resolver';
import { MessageIdStoreService } from '../sms/services/message-id-store.service';
import { SmsService } from '../sms/sms.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService,  
    private readonly providerResolver: BlockchainProviderResolver, 
    private readonly smsService: SmsService, 
    private readonly messageIdStore: MessageIdStoreService) {}

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
    const { text, messageId, msisdn } = body;

    if (this.messageIdStore.isProcessed(messageId)) {
      console.log(`Duplicate messageId: ${messageId}, skipping`);
      return 'Duplicate message, already processed.';
    }

    console.log(body);
    this.messageIdStore.markAsProcessed(messageId);

    // Example text: "10 @alice zksync" OR "5 0x1234... stellar"
    const [amount, recipientRaw, networkRaw] = text.trim().split(/\s+/);
    const network = this.providerResolver.identifyNetwork(networkRaw);
    const recipientType = this.identifyRecipientType(recipientRaw);

    console.log(`Received transfer request: amount=${amount}, recipient=${recipientRaw}, type=${recipientType}, network=${network}`);

    const txHash = await  this.transactionsService.transferToken(amount, 'USDT', recipientRaw, network);
    const explorerUrl = this.providerResolver.getExplorerTxUrl(txHash, network);
    const message = `Your transaction was confirmed  ${explorerUrl}`;
  
    await this.smsService.sendNotificationSms(msisdn, message);
  
    return txHash;
  }

  private identifyRecipientType(value: string): RecipientType {
    if (value.startsWith('@')) return RecipientType.Alias;
   // if (/^0x[a-fA-F0-9]{40}$/.test(value)) return RecipientType.Blockchain;
    return RecipientType.Blockchain;
  }

}
