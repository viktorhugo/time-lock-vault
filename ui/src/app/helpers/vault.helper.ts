 // Helper function to format CELO amount
export function formatAmount(amount: bigint) {
    return Number(amount) / 1e18;
}

// Helper function to check if vault is unlocked
export function isVaultUnlocked(unlockTime: bigint) {
    return Date.now() / 1000 > Number(unlockTime);
}

// Helper function to format unlock time
export function formatUnlockTime(unlockTime: bigint) {
    const date = new Date(Number(unlockTime) * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; ;
}

// Helper function to format unlock time
export function formatUnlockTimeCountdown(unlockTime: bigint) {
    const date = new Date(Number(unlockTime) * 1000);
    return date.toISOString();
}

// Helper function to format address display
export function formatAddress(address: string) {
    if (!address || address === '0x0000000000000000000000000000000000000000') {
        return 'No Owner';
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}