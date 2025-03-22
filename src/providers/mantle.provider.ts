import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { MANTLE_CONFIG } from '../config/mantle.config';

@Injectable()
export class MantleProvider {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(MANTLE_CONFIG.providerUrl);
    const privateKey = MANTLE_CONFIG.privateKey;
    if (!privateKey) {
      throw new Error('MANTLE_PRIVATE_KEY is not set in environment variables');
    }
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async transferToken(amount: string, tokenAddress: string, toRaw: string): Promise<string> {
    const to = (toRaw == MANTLE_CONFIG.defautUserNameTo ? MANTLE_CONFIG.defaultUserAddressTo : toRaw)
    const erc20Abi = [
      'function transfer(address to, uint amount) returns (bool)',
    ];
    const tokenContract = new ethers.Contract(MANTLE_CONFIG.tokenAddress, erc20Abi, this.wallet);

    //const decimals = await tokenContract.decimals();
    const parsedAmount = ethers.utils.parseUnits(amount, MANTLE_CONFIG.tokenDecimals);

    const tx = await tokenContract.transfer(to, parsedAmount);
    await tx.wait();

    return tx.hash;
  }
}
