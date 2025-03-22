import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { MANTLE_CONFIG } from '../config/mantle.config';

@Injectable()
export class MantleProvider {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
 /*   this.provider = new ethers.providers.JsonRpcProvider(MANTLE_CONFIG.providerUrl);
    const privateKey = MANTLE_CONFIG.privateKey;
    if (!privateKey) {
      throw new Error('MANTLE_PRIVATE_KEY is not set in environment variables');
    }
    this.wallet = new ethers.Wallet(privateKey, this.provider);*/
  }

  async transferToken(amount: string, tokenAddress: string, to: string): Promise<string> {
 /*   const erc20Abi = [
      'function transfer(address to, uint amount) returns (bool)',
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, this.wallet);

    const decimals = await tokenContract.decimals();
    const parsedAmount = ethers.utils.parseUnits(amount, decimals);

    const tx = await tokenContract.transfer(to, parsedAmount);
    await tx.wait();

    return tx.hash;*/
    return "";
  }
}
