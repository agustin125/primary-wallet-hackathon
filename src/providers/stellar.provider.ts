import { Injectable } from '@nestjs/common';
import { Keypair, Horizon, Networks, TransactionBuilder, Operation, Asset } from 'stellar-sdk';
import { STELLAR_CONFIG } from '../config/stellar.config';

@Injectable()
export class StellarProvider {
  private server: Horizon.Server;
  private keypair: Keypair;

  constructor() {
    this.server = new Horizon.Server(STELLAR_CONFIG.horizonUrl);
    this.keypair = Keypair.fromSecret(STELLAR_CONFIG.secretKey);
  }

  async transferToken(amount: string, assetCode: string, destination: string): Promise<string> {
    const sourceAccount = await this.server.loadAccount(this.keypair.publicKey());
    
    const asset = assetCode === 'XLM' 
      ? Asset.native() 
      : new Asset(assetCode, 'GA5ZSE2B3CB2TD2SHOQKXMVZMSJWXTUXEG4OHB7UUIQ4CIXS2RPVUGBE'); // Example issuer

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: (await this.server.fetchBaseFee()).toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(Operation.payment({ destination, asset, amount }))
      .setTimeout(30)
      .build();

    transaction.sign(this.keypair);
    const result = await this.server.submitTransaction(transaction);
    return result.hash;
  }
}
