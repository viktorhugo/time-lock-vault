// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface IERC20 {
    function transferFrom( address from, address to, uint256 amount ) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract VaultFactory {
    // @notice The deployer (could be used for admin actions)
    address public immutable OWNER;
    // @notice Auto-incrementing vault ID
    uint256 private nextVaultId;

    // @notice A single time-locked vault (CELO or ERC-20)
    struct Vault {
        address creator; // The owner of the vault
        address token; // The token address (CELO or ERC-20)
        uint256 amount; // The amount of tokens locked
        uint256 unlockTime; // The time when the vault can be unlocked
        bool isWithdrawn; // Whether the vault has been withdrawn
    }

     /// @dev vaultId => Vault
    mapping(uint256 => Vault) public vaults; // Maps vault ID to Vault struct
    // @dev creator => list of vaultIds
    mapping(address => uint256[]) public userVaults; // Maps creator address to list of vault IDs

    constructor(address _owner) {
        OWNER = _owner == address(0) ? msg.sender : _owner;
    }

    /// @notice Prevent accidental CELO sends
    receive() external payable {
        revert("Use createVaultCelo()");
    }


    // @notice Lock CELO until `_unlockTime`
    function createCeloVault(uint256 _unlockTime) external payable returns (uint256 vaultId) {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");

        vaultId = _storeVault(
            msg.sender,
            address(0), // Using address(0) for CELO
            msg.value,
            _unlockTime
        );
    }


    // @notice Lock ERC-20 `token` until `_unlockTime`
    // @dev caller must `approve` this contract for at least `_amount` first
    function createVaultErc20(address token, uint256 amount, uint256 _unlockTime)
        external
        returns (uint256 vaultId)
    {
        require(amount > 0, "Amount must be >0");
        require(_unlockTime > block.timestamp, "Unlock time must be in future");
        require(token != address(0), "Invalid token address");

        // pull tokens in
        bool ok = IERC20(token).transferFrom(msg.sender, address(this), amount);
        require(ok, "Token transfer failed");

        vaultId = _storeVault(msg.sender, token, amount, _unlockTime);
    }

    /// @notice Withdraw funds after unlock time
    function withdraw(uint256 vaultId) external {
        
        Vault storage vault = vaults[vaultId];

        require(vault.creator != address(0), "Vault does not exist");
        require(msg.sender == vault.creator, "Not vault creator");
        require(block.timestamp >= vault.unlockTime, "Too early");
        require(!vault.isWithdrawn, "Already withdrawn");

        vault.isWithdrawn = true;
        if (vault.token == address(0)) {
            // CELO
            payable(vault.creator).transfer(vault.amount);
        } else {
            // ERC-20
            bool ok = IERC20(vault.token).transfer(vault.creator, vault.amount);
            require(ok, "Token transfer failed");
        }
    }

    function _storeVault(
        address creator,
        address token,
        uint256 amount,
        uint256 _unlockTime
    ) internal returns (uint256 vaultId) {

        vaultId = nextVaultId++;
        Vault storage vault = vaults[vaultId];
        vault.creator = creator;
        vault.token = token;
        vault.amount = amount;
        vault.unlockTime = _unlockTime;
        vault.isWithdrawn = false;

        userVaults[creator].push(vaultId);
        return vaultId;
    }

    function getUserVaults(address _addressUser) external view returns (Vault[] memory) {
        uint256[] memory vaultIds = userVaults[_addressUser];
        Vault[] memory userAllVaults = new Vault[](vaultIds.length);
        
        for (uint256 i = 0; i < vaultIds.length; i++) {
            uint256 vaultId = vaultIds[i];
            Vault storage vault = vaults[vaultId];
            userAllVaults[i] = vault;
        }
        return userAllVaults; // Return the most recent vaults
    }

    function getVault(uint256 vaultId) external view returns (Vault memory) {
        return vaults[vaultId];
    }

}