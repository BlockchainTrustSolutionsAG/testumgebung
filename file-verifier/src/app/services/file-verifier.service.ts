import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { FileVerifierContract } from '../../assets/file-verifier-contract';
import { VerifierResponse } from './verifier-response.enum';

@Injectable({
  providedIn: 'root'
})
export class FileVerifierService {

  private static URL = 'http://127.0.0.1:7545';

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

  public async verify(fileHash, nameHash) {
    const provider = new ethers.providers.JsonRpcProvider(FileVerifierService.URL);
    const unsignedContract = new ethers.Contract(FileVerifierContract.ADDRESS, FileVerifierContract.ABI, provider);
    let result;
    if (!nameHash) {
      result = await unsignedContract.isFileUploaded(fileHash);
    } else {
      result = await unsignedContract.isFileWithNameUploaded(fileHash, nameHash);
    }
    return result;
  }

  public async upload(fileHash, nameHash): Promise<VerifierResponse> {
    const acc = this.getAccount();
    if (!acc) {
      return VerifierResponse.NOT_CONNECTED;
    } else if (!fileHash) {
      return VerifierResponse.NO_FILE_SELECTED;
    } else {
      const provider = new ethers.providers.JsonRpcProvider(FileVerifierService.URL);
      const unsignedContract = new ethers.Contract(FileVerifierContract.ADDRESS, FileVerifierContract.ABI, provider);
      const uploaded = await unsignedContract.isFileUploaded(fileHash);
      if (uploaded[0]) {
        return VerifierResponse.ALREADY_UPLOADED;
      } else {
        // @ts-ignore
        const web3Provider = new ethers.providers.Web3Provider(web3.currentProvider);
        const signer = web3Provider.getSigner();
        const signedContract = new ethers.Contract(FileVerifierContract.ADDRESS, FileVerifierContract.ABI, signer);
        try {
          await signedContract.addEntry(fileHash, nameHash);
          return VerifierResponse.SUCCESSFULLY_UPLOADED;
        } catch (error) {
          return VerifierResponse.CONNECTION_REFUSED;
        }
      }
    }
  }
}
