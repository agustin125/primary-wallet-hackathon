import { HttpException, Injectable } from '@nestjs/common';
import { Horizon, Networks,  Operation, Asset, TransactionBuilder } from 'stellar-sdk';
import { Keypair} from '@stellar/typescript-wallet-sdk';
import { STELLAR_CONFIG } from '../config/stellar.config';
import axios from 'axios';

@Injectable()
export class StellarProvider {
  private server: Horizon.Server;
  private keypair: Keypair;

  constructor() {
    this.server = new Horizon.Server(STELLAR_CONFIG.providerUrl);
    this.keypair = Keypair.fromSecret(STELLAR_CONFIG.privateKey);
  }

  async transferToken(amountUSD: string, assetCode = "XLM", toRaw: string): Promise<string> {
    const sourceAccount = await this.server.loadAccount(this.keypair.publicKey());
     const  to = (toRaw == STELLAR_CONFIG.defautUserNameTo ? STELLAR_CONFIG.defaultUserAddressTo : toRaw)
    
    const asset = assetCode === 'XLM' 
      ? Asset.native() 
      : new Asset(assetCode, 'GA5ZSE2B3CB2TD2SHOQKXMVZMSJWXTUXEG4OHB7UUIQ4CIXS2RPVUGBE'); // Example issuer

    const amount = assetCode === 'XLM' ? await this.amountUsdEquivalentInXlm(amountUSD) : amountUSD;

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: (await this.server.fetchBaseFee()).toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(Operation.payment({ destination: to, asset, amount }))
      .setTimeout(30)
      .build();

    transaction.sign(this.keypair);
    const result = await this.server.submitTransaction(transaction);
    return result.hash;
  }

  async getXlmUsdPrice(): Promise<number> {
    try {
      const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
      const usdPrice = res.data?.stellar?.usd;
      if (!usdPrice) throw new Error('Invalid response from CoinGecko');
      return usdPrice;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new HttpException('Unable to fetch XLM/USD price', 500);
    }
  }

  async amountUsdEquivalentInXlm(usdAmount: string): Promise<string> {
    const xlmPrice = await this.getXlmUsdPrice(); 
    const xlmAmount = (Number(usdAmount) / xlmPrice).toFixed(7);

    return xlmAmount;
  }
}
