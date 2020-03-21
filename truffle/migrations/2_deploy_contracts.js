const FileVerifier = artifacts.require('./FileVerifier.sol');

module.exports = function(deployer) {
    deployer.deploy(FileVerifier);
};
