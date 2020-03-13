const PdfVerifier = artifacts.require('./PdfVerifier.sol');

contract('PdfVerifier', (accounts) => {
    let verifierInstance = null;
    const fileHash = '0x62e9465de06800a302f36298efa0cfd43a90b4a4e25dfd41aa089ef289b01bba';

    it('initializes with correct attributes', () => {
        return PdfVerifier.deployed().then((instance) => {
            verifierInstance = instance;
            return verifierInstance.name();
        }).then((name) => {
            assert.equal(name, 'PDF Verifier', 'sets the correct name');
            return verifierInstance.version();
        }).then((version) => {
            assert.equal(version, 0, 'sets the correct version');
            return verifierInstance.getEntriesCount();
        }).then((count) => {
            assert.equal(count, 0, 'sets the correct entry amount');
            return verifierInstance.isFileUploaded(fileHash);
        }).then((uploaded) => {
            assert.equal(uploaded, false, 'file is not uploaded');
        });
    });

    it('handles entry add correctly', () => {
        return PdfVerifier.deployed().then((instance) => {
            verifierInstance = instance;
            return verifierInstance.addEntry.call(fileHash, { from: accounts[0] });
        }).then((id) => {
            assert.equal(id, 1, 'it returns id 1');
            return verifierInstance.addEntry(fileHash, { from: accounts[0] });
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, 'triggers an event');
            assert.equal(receipt.logs[0].event, 'EntryAdded', 'should be a "entry added" event');
            assert.equal(receipt.logs[0].args._id, 1, 'logs the id of the entry');
            assert.equal(receipt.logs[0].args._fileHash, fileHash, 'logs the file hash');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the sending account');
            return verifierInstance.getEntriesCount();
        }).then((count) => {
            assert.equal(count, 1, 'increases the amount of entries by 1');
            return verifierInstance.addEntry(fileHash, { from: accounts[0] });
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'cannot add the same file two times');
            return verifierInstance.isFileUploaded(fileHash);
        }).then((uploaded) => {
            assert.equal(uploaded, true, 'file is now uploaded');
        });
    });
});
