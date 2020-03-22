const FileValidator = artifacts.require('./FileValidator.sol');

contract('FileValidator', (accounts) => {
    let validatorInstance = null;
    const fileHash = '0x62e9465de06800a302f36298efa0cfd43a90b4a4e25dfd41aa089ef289b01bba';
    const nameHash = '0x82e9465de06800a302f36298efa0cfd43a90b4a4e25dfd41aa089ef289b01cfa';
    const wrongNameHash = '0x82e9465de06800a302f36298efa0cfd43a90b4a4e25dfd41aa089ef289b01aaa';

    it('initializes with correct attributes', () => {
        return FileValidator.deployed().then((instance) => {
            validatorInstance = instance;
            return validatorInstance.name();
        }).then((name) => {
            assert.equal(name, 'File Validator', 'sets the correct name');
            return validatorInstance.version();
        }).then((version) => {
            assert.equal(version, 0, 'sets the correct version');
            return validatorInstance.getEntriesCount();
        }).then((count) => {
            assert.equal(count, 0, 'sets the correct entry amount');
            return validatorInstance.isFileUploaded(fileHash);
        }).then((received) => {
            assert.equal(received[0], false, 'file is not uploaded (bool check)');
            assert.equal(received[1], 0, 'file is not uploaded (time check)');
        });
    });

    it('handles entry add correctly', () => {
        return FileValidator.deployed().then((instance) => {
            validatorInstance = instance;
            return validatorInstance.addEntry.call(fileHash, nameHash, { from: accounts[0] });
        }).then((id) => {
            assert.equal(id, 1, 'it returns id 1');
            return validatorInstance.addEntry(fileHash, nameHash, {from: accounts[0]});
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, 'triggers an event');
            assert.equal(receipt.logs[0].event, 'EntryAdded', 'should be a "entry added" event');
            assert.equal(receipt.logs[0].args._id, 1, 'logs the id of the entry');
            assert.equal(receipt.logs[0].args._fileHash, fileHash, 'logs the file hash');
            assert.equal(receipt.logs[0].args._nameHash, nameHash, 'logs the name hash');
            assert.notEqual(receipt.logs[0].args._timestamp, 0, 'logs the timestamp');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the sending account');
            return validatorInstance.getEntriesCount();
        }).then((count) => {
            assert.equal(count, 1, 'increases the amount of entries by 1');
            return validatorInstance.addEntry(fileHash, wrongNameHash, { from: accounts[0] });
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'cannot add the same file two times');
            return validatorInstance.isFileUploaded(fileHash);
        }).then((received) => {
            assert.equal(received[0], true, 'file is now uploaded (bool)');
            assert.notEqual(received[1], 0, 'file is now uploaded (time)');
            return validatorInstance.isFileWithNameUploaded(fileHash, wrongNameHash);
        }).then((received) => {
            assert.equal(received[0], false, 'file is not uploaded (bool)');
            assert.equal(received[1], 0, 'file is not uploaded (time)');
            return validatorInstance.isFileWithNameUploaded(fileHash, nameHash);
        }).then((received) => {
            assert.equal(received[0], true, 'file is uploaded (bool)');
            assert.notEqual(received[1], 0, 'file is uploaded (time)');
            return validatorInstance.getEntryById(1);
        }).then(received => {
            assert.equal(received[0], fileHash, 'correct file hash');
            assert.equal(received[1], nameHash, 'correct name hash');
            assert.equal(received[2], accounts[0], 'correct sending account');
            assert.notEqual(received[3], 0, 'correct time');
            return validatorInstance.getEntryById(0);
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'cannot find entry with id "0"');
            return validatorInstance.getEntryById(2);
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'cannot find entry with id "2"');
        });
    });
});
