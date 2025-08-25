'use client'

import { wagmiAdapter, projectId } from "../config/index";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, sepolia, celoAlfajores} from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
    throw new Error('Project ID is not defined');
}

// Set up metadata
const metadata = {
    name: 'Wallet Web3 - Vault dApp',
    description: 'A simple vault dApp using Reown AppKit & Celo',
    url: '', // origin must match your domain & subdomain
    icons: []
}

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, sepolia, celoAlfajores],
    defaultNetwork: mainnet,
    metadata: metadata,
    themeMode: 'light',
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
        allWallets: true, 
        email: true,
        socials: ['google', 'github', 'discord'],
        emailShowWallets: true
    },
    themeVariables: {
        '--w3m-accent': '#000000',
    }
});

//*  === This is the context provider that wraps the app and initializes the AppKit ===

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider;