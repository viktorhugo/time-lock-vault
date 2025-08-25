// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import { VaultFactory } from "../src/Vault.sol";
import { Script } from "forge-std/Script.sol";

contract DeployVault is Script {
    function run() external {
        // Start the broadcast
        vm.startBroadcast();
        // Deploy the Vault contract
        new VaultFactory(address(0));
        // stop the broadcast
        vm.stopBroadcast();
    }
}