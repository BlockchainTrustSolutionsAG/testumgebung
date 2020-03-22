const FileValidator = artifacts.require('./FileValidator.sol');

module.exports = function(deployer) {
    deployer.deploy(FileValidator);
};
