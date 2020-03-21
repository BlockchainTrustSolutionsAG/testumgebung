# File Verifier

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Setup Application locally

### Angular Application
1. Install [Node JS](https://nodejs.org/en/) version 12.14.0
2. If you run `node -v` you should see `v12.14.0`
3. If you run `npm -v` you should see `6.13.7`
4. Create a new folder wherever you want to save the project
5. Use the console or a git GUI like [Source Tree](https://www.sourcetreeapp.com/) to clone this repository
6. Run `npm install` inside `path_to_workspace/file-verifier/file-verifier` (this should create the node_modules folder with all dependencies)
7. Now you should be ready to develop and test the frontend application

### Truffle and Smart Contracts
1. Make sure that [Node JS](https://nodejs.org/en/) is installed
2. Download and install [Truffle](https://www.trufflesuite.com/) via `npm install truffle -g`
3. Check via `npm version truffle` which should output `6.13.7` if Truffle is installed correctly
4. Additionally install [Ganache](https://www.trufflesuite.com/ganache) in order to run a local blockchain
5. If you navigate to `path_to_workspace/file-verifier/truffle` and execute `truffle migrate` you can migrate the smart contract to the local blockchain.
6. In Ganache you click on the settings icon in the upper right corner. You should add the `path_to_workspace/file-verifier/truffle/truffle-config.js` file to the truffle projects.
7. You are now set up to see all the transaction in the `Smart Contract` tab of Ganache.

## Development

Run `ng serve` inside `path_to_workspace/file-verifier/file-verifier` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

In order to (re)migrate the smart contract to the local blockchain use `truffle migrate --reset`. Don't forget to change the address of the smart contract in the `assets/file-verifier-contract.ts` file.

## Build

Run `ng build` inside `path_to_workspace/file-verifier/file-verifier` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running Unit Tests

* Run `ng test` inside `path_to_workspace/file-verifier/file-verifier` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `truffle test` inside `path_to_workspace/file-verifier/truffle` to execute smart contract tests via [Mocha](https://mochajs.org/)
