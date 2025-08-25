export const cappyTokenAbi = [
    {
        type: "function",
        name: "allowance",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "approve",
        inputs: [
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "balanceOf",
        inputs: [
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint8",
                internalType: "uint8",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transfer",
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "transferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            {
                name: "owner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "spender",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "error",
        name: "ERC20InsufficientAllowance",
        inputs: [
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
            {
                name: "allowance",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "needed",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InsufficientBalance",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
            {
                name: "balance",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "needed",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidApprover",
        inputs: [
            {
                name: "approver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidReceiver",
        inputs: [
            {
                name: "receiver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidSender",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidSpender",
        inputs: [
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
        ],
    },
]

export const contractVaultAddress = '0xEC8d42d9836abFC118dE3F7ce124DeDb20234785'; // Celo Alfajores

export const vaultAbi = [
    {
    "type": "constructor",
    "inputs": [
        { "name": "_owner", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "nonpayable"
    },
    { "type": "receive", "stateMutability": "payable" },
    {
    "type": "function",
    "name": "OWNER",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "createCeloVault",
    "inputs": [
        { "name": "_unlockTime", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
        { "name": "vaultId", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "payable"
    },
    {
    "type": "function",
    "name": "createVaultErc20",
    "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "_unlockTime", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
        { "name": "vaultId", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "nonpayable"
    },
    {
    "type": "function",
    "name": "getUserVaults",
    "inputs": [
        { "name": "_addressUser", "type": "address", "internalType": "address" }
    ],
    "outputs": [
        {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct VaultFactory.Vault[]",
        "components": [
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            {
            "name": "unlockTime",
            "type": "uint256",
            "internalType": "uint256"
            },
            { "name": "isWithdrawn", "type": "bool", "internalType": "bool" }
        ]
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "getVault",
    "inputs": [
        { "name": "vaultId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
        {
        "name": "",
        "type": "tuple",
        "internalType": "struct VaultFactory.Vault",
        "components": [
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            {
            "name": "unlockTime",
            "type": "uint256",
            "internalType": "uint256"
            },
            { "name": "isWithdrawn", "type": "bool", "internalType": "bool" }
        ]
        }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "userVaults",
    "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "vaults",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
        { "name": "creator", "type": "address", "internalType": "address" },
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "unlockTime", "type": "uint256", "internalType": "uint256" },
        { "name": "isWithdrawn", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
    },
    {
    "type": "function",
    "name": "withdraw",
    "inputs": [
        { "name": "vaultId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
    }
]
