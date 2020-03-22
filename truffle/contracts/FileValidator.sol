pragma solidity ^0.5.16;

contract FileValidator {

    constructor() public {
        entries.push(Entry("", "", address(0), 0));
    }

    string public name = 'File Validator';
    uint8 public version = 0;

    struct Entry {
        bytes32 fileHash;
        bytes32 nameHash;
        address from;
        uint256 timestamp;
    }

    event EntryAdded(
        uint256 indexed _id,
        bytes32 indexed _fileHash,
        bytes32 indexed _nameHash,
        address _from,
        uint256 _timestamp
    );

    Entry[] internal entries;
    mapping (bytes32 => uint256) fileHashMapping;

    function addEntry(bytes32 _fileHash, bytes32 _nameHash) external returns (uint256) {
        require(findIdByFileHash(_fileHash) == 0);

        uint256 currTime = now;
        entries.push(Entry(_fileHash, _nameHash, msg.sender, currTime));
        emit EntryAdded(entries.length - 1, _fileHash, _nameHash, msg.sender, currTime);

        fileHashMapping[_fileHash] = entries.length - 1;

        return entries.length - 1;
    }

    function getEntriesCount() public view returns(uint256) {
        return entries.length - 1;
    }

    function isFileUploaded(bytes32 _fileHash) public view returns(bool, uint256) {
        uint256 id = findIdByFileHash(_fileHash);
        if(id == 0) {
            return (false, 0);
        } else {
            return (true, entries[id].timestamp);
        }
    }

    function isFileWithNameUploaded(bytes32 _fileHash, bytes32 _nameHash) public view returns(bool, uint256) {
        uint256 id = findIdByFileHash(_fileHash);
        if(id == 0) {
            return (false, 0);
        } else if(entries[id].nameHash != _nameHash) {
            return (false, 0);
        } else {
            return (true, entries[id].timestamp);
        }
    }

    function findIdByFileHash(bytes32 _fileHash) internal view returns (uint256) {
        return fileHashMapping[_fileHash];
    }

    function getEntryById(uint256 _id) public view returns(bytes32, bytes32, address, uint256) {
        require(_id > 0 &&_id <= getEntriesCount());
        return (entries[_id].fileHash, entries[_id].nameHash, entries[_id].from, entries[_id].timestamp);
    }
}
