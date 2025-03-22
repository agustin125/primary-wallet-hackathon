import { Injectable } from '@nestjs/common';
import * as zksync from 'zksync-web3';
import { Wallet, utils } from 'ethers';
import { ZKSYYNC_CONFIG } from '../config/zksync.config';

@Injectable()
export class ZkSyncProvider {
  private zkSyncProvider: zksync.Provider;
  private ethWallet: Wallet;
  private zkWallet: zksync.Wallet;

  constructor() {
    this.zkSyncProvider = new zksync.Provider(ZKSYYNC_CONFIG.providerUrl);
    this.ethWallet = new Wallet(ZKSYYNC_CONFIG.privateKey);
    this.zkWallet = new zksync.Wallet(this.ethWallet.privateKey, this.zkSyncProvider);
  }
  async transferToken(amount: string, tokenAddress: string, toRaw: string): Promise<string> {
    const parsedAmount = utils.parseUnits(amount, ZKSYYNC_CONFIG.tokenDecimals);

    const  to = (toRaw == ZKSYYNC_CONFIG.defautUserNameTo ? ZKSYYNC_CONFIG.defaultUserAddressTo : toRaw)
    const tx = await this.zkWallet.transfer({
      to,
      token: ZKSYYNC_CONFIG.tokenAddress,
      amount: parsedAmount,
    });

    await tx.wait();
    return tx.hash;
  }
}
