pragma solidity ^0.5.16;

contract PdfVerifier {

    constructor() public {
        entries.push(Entry(0, address(0)));
    }

    string public name = 'PDF Verifier';
    uint8 public version = 0;

    struct Entry {
        // additional information about an entry: location, description, etc.
        bytes32 fileHash;
        address from;
    }

    event EntryAdded(
        uint256 _id,
        bytes32 _fileHash,
        address indexed _from
    );

    Entry[] public entries;
    mapping (bytes32 => uint256) fileHashMapping;

    function addEntry(bytes32 _fileHash) external returns (uint256) {
        require(findIdByFileHash(_fileHash) == 0);

        entries.push(Entry(_fileHash, msg.sender));

        fileHashMapping[_fileHash] = entries.length - 1;

        emit EntryAdded(entries.length - 1, _fileHash, msg.sender);

        return entries.length - 1;
    }

    function getEntriesCount() public view returns(uint256) {
        return entries.length - 1;
    }

    function isFileUploaded(bytes32 _fileHash) public view returns(bool) {
        return findIdByFileHash(_fileHash) == 0 ? false : true;
    }

    function findIdByFileHash(bytes32 _fileHash) internal view returns (uint256) {
        return fileHashMapping[_fileHash];
    }
}
