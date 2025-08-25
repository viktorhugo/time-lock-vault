'use client'

import { Address } from "viem";
import { ConnectButton } from "./components/ConnectButton";
import { useBalance } from 'wagmi'
import { useAccount } from "wagmi";
import VaultCreation from "./components/VaultCreation";
import MyVaults from "./components/MyVaults";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { HandCoins, Smile, Vault } from "lucide-react";

export default function Home() {

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  const result = useBalance({
    address: address as Address,
  })

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-title text-gray-600">Time Lock Vault</h1>
        <ConnectButton disabled={isConnecting} />
      </nav>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-100 p-4">
        {
          isDisconnected && (
            <div className="flex items-center justify-center h-full mt-20">
              <div className="text-center bg-white dark:bg-gray-900/60 p-8 rounded-xl shadow-lg flex flex-col items-center">
                <div className="mb-6 animate-bounce">
                  <HandCoins className="text-green-500 w-10 h-10 mb-3" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Welcome!</h1>
                <p className="text-gray-600 mb-2 flex items-center justify-center space-x-2">
                  <Smile className="text-green-400 w-5 h-5 mr-2" />
                  Protect your assets and control the unlocking time.
                  <br />
                  Connect your wallet to begin your secure financial journey.
                </p>
                <ConnectButton disabled={isConnecting} />
              </div>
            </div>
          )
        }
        {
          isConnecting && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                  <div className="animate-pulse">
                      <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="text-center text-gray-500">Connecting...</div>
                  </div>
              </div>
            </div>
          )
        }
        {
          isConnected && address && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 ring-1 ring-black ring-opacity-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-md font-mono text-gray-900 break-all">{address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Balance</p>
                    <p className="text-md font-semibold text-gray-900">
                      {result.data ? `${result.data.formatted} ${result.data.symbol}` : 'Loading...'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Tabs defaultValue="my-vaults" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="my-vaults">My Vaults</TabsTrigger>
                    <TabsTrigger value="create-vault">Create Vault</TabsTrigger>
                  </TabsList>
                  <TabsContent value="my-vaults">
                    <MyVaults address={address} />
                  </TabsContent>
                  <TabsContent value="create-vault">
                    <VaultCreation address={address} balance={result.data?.formatted || '0'} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )
        }
      </main>
    </>
  );
}