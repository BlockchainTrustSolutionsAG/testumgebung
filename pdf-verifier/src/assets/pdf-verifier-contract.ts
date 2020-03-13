export class PdfVerifierContract {

    public static ABI = [
        {
            inputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: '_id',
                    type: 'uint256'
                },
                {
                    indexed: false,
                    internalType: 'bytes32',
                    name: '_fileHash',
                    type: 'bytes32'
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: '_from',
                    type: 'address'
                }
            ],
            name: 'EntryAdded',
            type: 'event'
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: 'bytes32',
                    name: '_fileHash',
                    type: 'bytes32'
                }
            ],
            name: 'addEntry',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            name: 'entries',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: 'fileHash',
                    type: 'bytes32'
                },
                {
                    internalType: 'address',
                    name: 'from',
                    type: 'address'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [],
            name: 'getEntriesCount',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: 'bytes32',
                    name: '_fileHash',
                    type: 'bytes32'
                }
            ],
            name: 'isFileUploaded',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [],
            name: 'name',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [],
            name: 'version',
            outputs: [
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        }
    ];

    public static ADDRESS = '0x2aCf38EAC7E38C4Bb2D8e181754E9cfa233c64fC'; // change while testing
}
