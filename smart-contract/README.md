# Time Lock Vault

This project is an Ethereum smart contract for a "Time Lock Vault", developed using [Foundry](https://book.getfoundry.sh/), a fast and modular toolkit for Ethereum application development.

## Project Structure

- `src/`: Main smart contracts (`Vault.sol`)
- `script/`: Deployment scripts (`DeployVault.s.sol`)
- `test/`: Automated tests (`Vault.test.sol`)
- `broadcast/`: Deployment artifacts and runs
- `lib/forge-std/`: Foundry standard libraries

## Requirements

- [Foundry](https://book.getfoundry.sh/getting-started/installation.html) installed (`forge`, `cast`, `anvil`)
- Node.js and npm (optional, for additional tools)
- Environment variables in `.env` for private keys and RPC URLs

## Basic Commands

### Compile contracts

```sh
forge build
```

### Run tests

```sh
forge test
```

### Format code

```sh
forge fmt
```

### Take gas snapshot

```sh
forge snapshot
```

### Run local node

```sh
anvil
```

### Deploy contracts

```sh
forge script script/DeployVault.s.sol --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

### Use Cast

```sh
cast <subcommand>
```

## Documentation

See the [official Foundry documentation](https://book.getfoundry.sh/) for more details on workflow and advanced commands.

## License

This project uses the [MIT](lib/forge-std/LICENSE-MIT) and [Apache 2.0](lib/forge-std/LICENSE-APACHE) licenses via forge-std.