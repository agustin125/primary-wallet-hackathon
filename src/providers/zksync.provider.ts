import { Injectable } from '@nestjs/common';
import * as zksync from 'zksync-web3';
import { Wallet, utils } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ZkSyncProvider {
  private zkSyncProvider: zksync.Provider;
  private ethWallet: Wallet;
  private zkWallet: zksync.Wallet;

  constructor() {
    const rpcUrl = process.env.ZKSYNC_RPC_URL || 'https://testnet.era.zksync.dev';
    this.zkSyncProvider = new zksync.Provider(rpcUrl);

    this.ethWallet = new Wallet(process.env.ZKSYNC_PRIVATE_KEY);
    this.zkWallet = new zksync.Wallet(this.ethWallet.privateKey, this.zkSyncProvider);
  }

  async transferToken(amount: string, tokenAddress: string, to: string): Promise<string> {
    const parsedAmount = utils.parseUnits(amount, 18); // default 18 decimals

    const tx = await this.zkWallet.transfer({
      to,
      token: tokenAddress,
      amount: parsedAmount,
    });

    await tx.wait();
    return tx.hash;
  }
}
