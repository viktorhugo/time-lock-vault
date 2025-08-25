# Time-Lock Vault on Celo

<!-- <p align="center">
  <img src="https://raw.githubusercontent.com/gelasss/celo-time-lock-vault/main/ui/public/file.svg" alt="Time-Lock Vault Logo" width="150">
</p> -->

<h1 align="center">Time-Lock Vault</h1>

<p align="center">
  A decentralized application (dApp) for locking CELO and ERC-20 tokens in a time-locked vault on the Celo blockchain.
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/gelasss/celo-time-lock-vault/main/ui/public/dapp-screenshot.webp" alt="Time-Lock Vault dApp Screenshot" width="700">
</p>

## 🌟 Overview

This project provides a secure and user-friendly way to lock digital assets for a specified period. It's built with a robust Solidity smart contract and a modern Next.js frontend, offering a seamless user experience. The core functionality allows users to deposit CELO or any ERC-20 token into a vault that can only be unlocked after a predetermined time, ensuring the assets are held securely until the lock expires.

## ✨ Features

- **Lock CELO and ERC-20 Tokens:** Securely lock native CELO tokens or any ERC-20 compliant token.
- **Custom Unlock Times:** Set a specific date and time in the future when the assets can be withdrawn.
- **View Your Vaults:** Easily view a list of all the vaults you have created, along with their details.
- **Secure Withdrawals:** Withdraw your funds only after the unlock time has passed.
- **Decentralized and Secure:** Built on the Celo blockchain, ensuring transparency and security.
- **User-Friendly Interface:** A clean and intuitive interface built with Next.js and Tailwind CSS.

## 🏗️ Architecture

The project follows a standard dApp architecture:

- **Frontend:** A Next.js application that provides the user interface. It uses `wagmi` and `viem` to interact with the Celo blockchain.
- **Smart Contract:** A Solidity-based smart contract deployed on the Celo network. The `VaultFactory` contract is responsible for creating and managing individual time-locked vaults.

## 🛠️ Technologies Used

### Smart Contract

- **[Solidity](https://soliditylang.org/):** The programming language for the smart contract.
- **[Foundry](https://getfoundry.sh/):** A blazing fast, portable, and modular toolkit for Ethereum application development.

### Frontend

- **[Next.js](https://nextjs.org/):** A React framework for building server-side rendered and static web applications.
- **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
- **[Wagmi](https://wagmi.sh/):** A set of React Hooks for Ethereum.
- **[Viem](https://viem.sh/):** A lightweight, composable, and type-safe library for interacting with Ethereum.

## 📂 Project Structure

```
.
├── smart-contract/   # Solidity smart contract
│   ├── src/          # Main contract source code (Vault.sol)
│   ├── test/         # Tests for the smart contract
│   ├── script/       # Deployment scripts
│   └── ...
└── ui/               # Frontend application
    ├── src/          # Next.js application source code
    ├── public/       # Static assets
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- **[Foundry](https://book.getfoundry.sh/getting-started/installation.html):** Install the Foundry toolchain.
- **[Node.js](https://nodejs.org/en/):** Use version 18 or higher.
- **[Git](https://git-scm.com/):** To clone the repository.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gelasss/celo-time-lock-vault.git
    cd celo-time-lock-vault
    ```

2.  **Install smart contract dependencies:**

    ```bash
    cd smart-contract
    forge install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../ui
    npm install
    ```

### Configuration

1.  **Smart Contract:** Create a `.env` file in the `smart-contract` directory and add the following:

    ```
    PRIVATE_KEY=<your-private-key>
    RPC_URL=<your-celo-alfajores-rpc-url>
    ```

2.  **Frontend:** Create a `.env.local` file in the `ui` directory and add the following:

    ```
    NEXT_PUBLIC_PROJECT_ID=<your-walletconnect-project-id>
    ```

## Usage

### Smart Contract

All commands should be run from the `smart-contract` directory.

- **Compile:** `forge build`
- **Test:** `forge test`
- **Deploy:** `forge script script/DeployVault.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast`

### Frontend

All commands should be run from the `ui` directory.

- **Run in development mode:** `npm run dev`
- **Build for production:** `npm run build`
- **Run in production mode:** `npm run start`

## 🧪 Testing

### Smart Contract

To run the tests for the smart contract, navigate to the `smart-contract` directory and run:

```bash
forge test
```

To see a coverage report, run:

```bash
forge coverage
```

### Frontend

To run the linter for the frontend, navigate to the `ui` directory and run:

```bash
npm run lint
```

## 🚢 Deployment

### Smart Contract

The smart contract can be deployed to any EVM-compatible network. The deployment script is located in `smart-contract/script/DeployVault.s.sol`. To deploy to the Celo Alfajores testnet, use the following command:

```bash
cd smart-contract
forge script script/DeployVault.s.sol --rpc-url https://alfajores-forno.celo-testnet.org --private-key $PRIVATE_KEY --broadcast
```

### Frontend

The frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🙌 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
