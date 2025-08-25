'use client'

import { Abi, Address } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contractVaultAddress, vaultAbi } from "../constants";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { BadgeDollarSign, BanknoteArrowDown, ClockAlert, LockKeyhole, LockKeyholeOpen, ShieldCheck, Smile, UserCheck, Vault } from "lucide-react";
import Loader from "./Loader";
import { formatAddress, formatAmount, formatUnlockTime, formatUnlockTimeCountdown, isVaultUnlocked } from "../helpers/vault.helper";
import { useState } from "react";
import CountdownComponent from "./CountDown";

interface MyVaultsProps {
  address: Address | undefined;
}

interface Vault {
  creator: string;
  amount: bigint;
  token: Address;
  unlockTime: bigint;
  isWithdrawn: boolean;
}

export default function MyVaults({ address }: MyVaultsProps) {

  const [ withdrawingVaultId, setWithdrawingVaultId] = useState<number | null>(null);
  // For creator verification
  const { data: ownerData, isLoading: isOwnerLoading, error: ownerError } = useReadContract({
    abi: vaultAbi as Abi,
    address: contractVaultAddress as Address,
    functionName: "getUserVaults",
    args: address ? [address] : undefined,
  })

  const vaults: Vault[] = ownerData ? (ownerData as unknown as Vault[]) : [];

  console.log('Owner Data:', ownerData);
  console.log('Owner Loading:', isOwnerLoading);
  console.log('Owner Error:', ownerError);

  // For Withdraw on the vault
  const {
    data: withdrawnHash,
    isPending: isWithdrawingPending,
    writeContract: withdrawVault,
    status: withdrawStatus,
    error: withdrawError,
  } = useWriteContract();

  const { isSuccess: isWithdrawnFromVaultSuccess } = useWaitForTransactionReceipt({
      hash: withdrawnHash,
  })

  // Handle create vault
  async function handleWithdrawVault(vaultId: number) {
    if ( !address || !vaultAbi) return alert('Error: Account or ABI not found');
    // setIsCreating(true);
    try {
      await withdrawVault({
          address: contractVaultAddress as Address, // Updated contract address
          abi: vaultAbi as Abi,
          functionName: 'withdraw',
          args: [BigInt(vaultId)],
          account: address as Address,
      })
      setWithdrawingVaultId(vaultId);
    } catch (error) {
        console.error('Error creating vault:', error);
        alert('Failed to create vault. Please try again.');
    } finally {
      // setIsCreating(false);
    }
  }

  console.log('isWithdrawingPending:', isWithdrawingPending);
  console.log('withdrawStatus:', withdrawStatus);
  console.log('isWithdrawnFromVaultSuccess:', isWithdrawnFromVaultSuccess);
  console.log('withdrawError:', withdrawError);

  if (!address) {
    return <p className="text-center text-gray-500">Please connect your wallet to view your vaults.</p>;
  }

  return (
    <Card className="animate-in fade-in slide-in-from-top-4 duration-500">
      <CardHeader>
        <CardTitle className='text-center text-xl font-bold text-gray-900'>My Vaults</CardTitle>
      </CardHeader>
      <CardContent >
        <p className="text-gray-700 mb-4 flex items-center justify-center space-x-2">
          <Smile className="text-green-400 w-5 h-5 mr-2" />
          ¡Welcome! Here you can see your vaults associated with your Address. 
        </p>
        <div className="border-t pt-4">
          { isOwnerLoading ? (
              <Loader />
            ) : ownerData && (ownerData as string[]).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
                {
                  vaults.map((vault, index) => (
                    <div key={`${index + 1 }- ${vault.creator}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md">
                      <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                              Vault #{index + 1}
                          </h3>
                          <span className={
                              `flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-md shadow-md ${vault.isWithdrawn
                                  ? 'bg-gray-200 text-gray-800'
                                  : isVaultUnlocked(vault.unlockTime)
                                      ? 'bg-emerald-100 text-emerald-900'
                                      : 'bg-rose-100 text-rose-900'
                              }`
                          }>
                            {
                              !vault.isWithdrawn && isVaultUnlocked(vault.unlockTime)
                                ? <LockKeyholeOpen className="text-sm font-light mr-1" size={14} />
                                : <LockKeyhole className="text-sm font-light mr-1" size={14} />
                                
                            }
                            {
                              vault.isWithdrawn
                                ? 'Withdrawn'
                                : isVaultUnlocked(vault.unlockTime)
                                    ? 'Unlocked'
                                    : 'Locked'
                            }
                          </span>
                      </div>

                      <div className="mt-6 space-y-4 text-md">
                          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-inner mb-1">
                              <div className="flex items-center">
                                  <UserCheck className="h-6 w-6 text-gray-500" size={14}/>
                                  <p className="ml-3 text-gray-700">
                                      <span className="font-bold">Owner:</span> {formatAddress(vault.creator)}
                                  </p>
                              </div>
                              {
                                vault.creator.toLowerCase() === address.toLowerCase() && (
                                  <span className="flex items-center justify-center px-3 py-1 bg-blue-200 text-blue-800 shadow-md text-xs font-bold rounded-md">
                                    YOU
                                    <ShieldCheck className=" ml-1" size={13}/>
                                    {/* <BadgeCheck /> */}
                                  </span>
                                )
                              }
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-inner mb-1">
                              <div className="flex items-center">
                                <BadgeDollarSign className="h-6 w-6 text-gray-500" size={14} />
                                <span className="ml-3 text-gray-700">
                                    <span className="font-bold">Amount:</span> <span className="font-mono">{formatAmount(vault.amount)}</span> CELO
                                </span>
                              </div>
                          </div>

                          <div className="p-3 bg-gray-100 rounded-lg shadow-inner">
                              <div className="grid grid-cols-12 items-center">
                                <div className="col-span-1 flex items-center justify-center">
                                  <ClockAlert className="col-span-1 h-6 w-6 text-gray-500" size={14} />
                                </div>
                                <div className="col-span-11 flex items-center ">
                                  <span className="ml-3 text-gray-700">
                                    <span className="font-bold">Unlocks:</span> 
                                    <span className=" ml-1 text-gray-500 font-mono text-md">{formatUnlockTime(vault.unlockTime)}</span>
                                    <CountdownComponent targetDate={formatUnlockTimeCountdown(vault.unlockTime)} />
                                  </span>
                                </div>

                              </div>
                          </div>
                      </div>

                      {/* Withdraw Button */}
                      { 
                        vault.creator.toLowerCase() === address.toLowerCase() && !vault.isWithdrawn 
                        && isVaultUnlocked(vault.unlockTime) && (
                          <button
                              onClick={ () => handleWithdrawVault(index + 1) }
                              disabled={ withdrawingVaultId === index + 1 }
                              className="mt-3 w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 
                              focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed 
                              flex items-center justify-center space-x-2"
                          >
                            { 
                              withdrawingVaultId === index + 1 && withdrawStatus === "pending"
                              ? (
                                  <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      <span>Withdrawing...</span>
                                  </>
                              ) : (
                                <>
                                  <BanknoteArrowDown className="h-6 w-6 text-white" size={14} />
                                  <span>Withdraw</span>
                                </>
                              )
                            }
                          </button>
                        )
                      }
                    </div>
                  ))
                }
                { 
                  withdrawStatus === "pending" && (
                      <div className="text-center text-gray-500 text-sm py-2">Loading more vaults...</div>
                  )
                }
            </div>
            ) : (
              <div className="mt-4 pt-2 flex items-center justify-center space-x-2">
                <Vault className="text-gray-400  w-5 h-5" />
                <Smile className="text-yellow-400 w-5 h-5" />
                <p className="text-gray-500 font-medium">
                  ¡You do not have any vaults yet, but this is a great time to create your first one!
                </p>
              </div>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}