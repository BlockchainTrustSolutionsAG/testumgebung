const PdfVerifier = artifacts.require('./PdfVerifier.sol');

module.exports = function(deployer) {
    deployer.deploy(PdfVerifier);
};
