export class FileValidatorContract {

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
                    indexed: true,
                    internalType: 'uint256',
                    name: '_id',
                    type: 'uint256'
                },
                {
                    indexed: true,
                    internalType: 'bytes32',
                    name: '_fileHash',
                    type: 'bytes32'
                },
                {
                    indexed: true,
                    internalType: 'bytes32',
                    name: '_nameHash',
                    type: 'bytes32'
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: '_from',
                    type: 'address'
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: '_timestamp',
                    type: 'uint256'
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
                },
                {
                    internalType: 'bytes32',
                    name: '_nameHash',
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
                    internalType: 'uint256',
                    name: '_id',
                    type: 'uint256'
                }
            ],
            name: 'getEntryById',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: '',
                    type: 'bytes32'
                },
                {
                    internalType: 'bytes32',
                    name: '',
                    type: 'bytes32'
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address'
                },
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
                },
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
                },
                {
                    internalType: 'bytes32',
                    name: '_nameHash',
                    type: 'bytes32'
                }
            ],
            name: 'isFileWithNameUploaded',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool'
                },
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

    public static ADDRESS = '0x04F3B6457c46Ac8500f17E8ea3B1D1768d0e47BE';
    // '0x0f9B9d0E9964f54C997d4Ac815355D834585460d'; change while testing
    // '0x171b624554389d5Bf68c54B69F93DaaAe9550753'
}
