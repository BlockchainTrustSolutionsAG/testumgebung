import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { FileValidatorContract } from '../../assets/file-validator-contract';
import { ValidateResponse } from './validate-response.enum';

@Injectable({
  providedIn: 'root'
})
export class FileValidatorService {

  private static URL = 'https://rpc.bluchain.pro';

  public loading: boolean;

  constructor() { }

  private async getAccount() {
    try {
      // @ts-ignore
      const accounts = await ethereum.send('eth_requestAccounts');
      return accounts.result[0];
    } catch (error) {
      if (error.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
      return undefined;
    }
  }

  public async validate(fileHash, nameHash) {
    let result = null;
    try {
      const provider = new ethers.providers.JsonRpcProvider(FileValidatorService.URL);
      const unsignedContract = new ethers.Contract(FileValidatorContract.ADDRESS, FileValidatorContract.ABI, provider);
      if (!nameHash) {
        result = await unsignedContract.isFileUploaded(fileHash);
      } else {
        result = await unsignedContract.isFileWithNameUploaded(fileHash, nameHash);
      }
      return result;
    } catch (exception) {
      return result;
    }
  }

  public async upload(fileHash, nameHash): Promise<ValidateResponse> {
    const acc = this.getAccount();
    if (!acc) {
      return ValidateResponse.NOT_CONNECTED;
    } else if (!fileHash) {
      return ValidateResponse.NO_FILE_SELECTED;
    } else {
      const provider = new ethers.providers.JsonRpcProvider(FileValidatorService.URL);
      const unsignedContract = new ethers.Contract(FileValidatorContract.ADDRESS, FileValidatorContract.ABI, provider);
      const uploaded = await unsignedContract.isFileUploaded(fileHash);
      if (uploaded[0]) {
        return ValidateResponse.ALREADY_UPLOADED;
      } else {
        // @ts-ignore
        const web3Provider = new ethers.providers.Web3Provider(web3.currentProvider);
        const signer = web3Provider.getSigner();
        const signedContract = new ethers.Contract(FileValidatorContract.ADDRESS, FileValidatorContract.ABI, signer);
        try {
          await signedContract.addEntry(fileHash, nameHash);
          return ValidateResponse.SUCCESSFULLY_UPLOADED;
        } catch (error) {
          return ValidateResponse.CONNECTION_REFUSED;
        }
      }
    }
  }
}
