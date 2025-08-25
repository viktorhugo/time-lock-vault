// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import { Test } from "forge-std/Test.sol";
import { VaultFactory } from "../src/Vault.sol";

contract VaultFactoryTest is Test {
    VaultFactory public newVault;
    address public bob = address(0x2);

    function setUp() public {
        newVault = new VaultFactory(address(0));
        vm.deal(bob, 10 ether);
        vm.deal(address(this), 10 ether);
    }

    receive() external payable {}

    function test_CeloVault_HappyPath() public {
        // Setup: call createVaultCelo sending 1 ether with _unlockTime = block.timestamp + 1 days
        uint256 lockAmount = 1 ether;
        uint256 unlockTime = block.timestamp + 1 days;
        
        uint256 vaultId = newVault.createCeloVault{value: lockAmount}(unlockTime);

        // Verify vault was created correctly
        (address creator, address token, uint256 amount, uint256 vaultUnlockTime, bool withdrawn) = newVault.vaults(vaultId);
        assertEq(creator, address(this));
        assertEq(token, address(0)); // CELO is represented as address(0)
        assertEq(amount, lockAmount);
        assertEq(vaultUnlockTime, unlockTime);
        assertEq(withdrawn, false);

        // Advance time: vm.warp(block.timestamp + 1 days + 1)
        uint256 warpTo = block.timestamp + 1 days + 1;
        vm.warp(warpTo);

        // Record balance before withdrawal
        uint256 balanceBefore = address(this).balance;

        // Assert: calling withdraw(vaultId) transfers the 1 ETH back to the creator and marks withdrawn = true
        newVault.withdraw(vaultId);

        // Verify withdrawal
        (creator, token, amount, vaultUnlockTime, withdrawn) = newVault.vaults(vaultId);
        assertEq(withdrawn, true);

        // Verify received the funds
        uint256 balanceAfter = address(this).balance;
        assertEq(balanceAfter, balanceBefore + lockAmount);
    }
}