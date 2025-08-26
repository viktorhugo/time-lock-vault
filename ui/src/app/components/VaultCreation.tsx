'use client'
import { useState } from 'react';
import { Abi, Address } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractVaultAddress, vaultAbi } from '../constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleCheckBig, CirclePlus, LoaderCircle, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VaultCreation({ address, balance }: { address: Address | undefined, balance: string }) {


    const [vaultAmount, setVaultAmount] = useState<string | undefined>(undefined);
    const [timeUnits, setTimeUnits] = useState({ seconds: 0, minutes: 0, hours: 0, days: 0 });
    const [isCreating, setIsCreating] = useState(false);
    const [vaultId, setVaultId] = useState<string | undefined>(undefined);

    function getTotalSeconds() {
        return timeUnits.days * 86400 + timeUnits.hours * 3600 + timeUnits.minutes * 60 + timeUnits.seconds;
    }

    // For creating vault
    const {
        data: createdVaultHash,
        isPending: iscreatingAVaultPending,
        status: creatingVaultStatus,
        writeContract: createdVault,
        error: createdVaultError,
    } = useWriteContract();

    // Transaction receipts
    const { isSuccess: isCreatedVaultSuccess, status: createdVaultStatus, data: createdVaultData } = useWaitForTransactionReceipt({
        hash: createdVaultHash,
    })


    // Handle create vault
    const HandleCreateVault = async () => {
        if ( !address || !vaultAbi) return alert('Error: Account or ABI not found');

        if ( !vaultAmount || vaultAmount === '') return alert('Error: Vault Amount cannot be empty');

        const totalSeconds = getTotalSeconds();
        if (totalSeconds === 0) {
            alert('Please set a lock duration');
            return;
        }
        const amount = parseFloat(vaultAmount);
        if (amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (amount > parseFloat(balance)) {
            alert('Insufficient balance');
            return;
        }
        setIsCreating(true);
        try {
            // Convert the time to unix timestamp
            // Assuming the contract expects a unix timestamp for the unlock time 
            const unlockTime = Math.floor(Date.now() / 1000) + totalSeconds;
            await createdVault({
                address: contractVaultAddress as Address, // Updated contract address
                abi: vaultAbi as Abi,
                functionName: 'createCeloVault',
                args: [BigInt(unlockTime)],
                value: BigInt(Math.floor(amount * 1e18)),
                account: address as Address,
            })
            setVaultId(undefined); // For now, just set to 0
            // alert('Vault created successfully!');
        } catch (error) {
            console.error('Error creating vault:', error);
            alert('Failed to create vault. Please try again.');
        } finally {
            setIsCreating(false);
        }
    }

    console.log('createdVaultData:', createdVaultData);
    console.log('iscreatingAVaultPending:', iscreatingAVaultPending);
    console.log('creatingVaultStatus:', creatingVaultStatus);
    console.log('createdVaultError:', createdVaultError);
    
    if (!address) return null;

    return (
        <Card className="animate-in fade-in slide-in-from-top-4 duration-500">
            <CardHeader>
                <CardTitle className='text-center text-xl font-bold text-gray-900 mb-4'>Create a new Time-Lock Vault</CardTitle>
                <CardDescription>Lock your CELO for a specified duration to earn rewards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">CELO Amount to Lock</label>
                    <Input
                        type="number"
                        value={vaultAmount}
                        onChange={(e) => setVaultAmount(e.target.value)}
                        min="0.001"
                        step="0.001"
                        placeholder="0.01"
                    />
                    <p className="text-xs text-gray-500">Available: {balance} CELO</p>
                </div>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-900">Lock Duration</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {/* Days, Hours, Minutes, Seconds controls */}
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                            <span className="text-sm text-gray-700 font-medium">Days</span>
                            <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, days: Math.max(0, prev.days - 1) }))}>-</Button>
                                <span className="w-8 text-center font-bold text-gray-900">{timeUnits.days}</span>
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, days: prev.days + 1 }))}>+</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                            <span className="text-sm text-gray-700 font-medium">Hours</span>
                            <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, hours: Math.max(0, prev.hours - 1) }))}>-</Button>
                                <span className="w-8 text-center font-bold text-gray-900">{timeUnits.hours}</span>
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, hours: prev.hours + 1 }))}>+</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                            <span className="text-sm text-gray-700 font-medium">Minutes</span>
                            <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, minutes: Math.max(0, prev.minutes - 1) }))}>-</Button>
                                <span className="w-8 text-center font-bold text-gray-900">{timeUnits.minutes}</span>
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, minutes: prev.minutes + 1 }))}>+</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                            <span className="text-sm text-gray-700 font-medium">Seconds</span>
                            <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, seconds: Math.max(0, prev.seconds - 1) }))}>-</Button>
                                <span className="w-8 text-center font-bold text-gray-900">{timeUnits.seconds}</span>
                                <Button variant="outline" size="icon" onClick={() => setTimeUnits(prev => ({ ...prev, seconds: prev.seconds + 1 }))}>+</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium">Total Duration:</p>
                        <p className="text-sm font-bold text-blue-900">{timeUnits.days}d {timeUnits.hours}h {timeUnits.minutes}m {timeUnits.seconds}s</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col items-stretch">
                <Button
                    onClick={HandleCreateVault}
                    disabled={(!vaultAmount || vaultAmount === '') || isCreating || !address || Number(vaultAmount) <= 0 || getTotalSeconds() === 0}
                    className="cursor-pointer w-full justify-center mb-2 text-md font-semibold"
                >

                    {
                        creatingVaultStatus === "pending" ? (
                            <>
                                <LoaderCircle className="animate-spin text-xl text-white" size={25} />
                                Creating Vault...
                            </>
                        ) : (
                            <div className="flex items-center justify-center gap-2 ">  
                                Create Vault
                                <CirclePlus size={25} className="color-white"/>
                            </div>
                        )
                    }
                </Button>
                {
                    isCreatedVaultSuccess && (
                        <Alert className=" bg-green-50 border-green-200 rounded-lg p-3 mt-2">
                            <AlertDescription className="grid grid-cols-12 text-white text-md  items-center justify-center gap-2">
                                <div className="col-span-1 justify-center">
                                    <CircleCheckBig className="text-xl text-green-800" size={40} />
                                </div>
                                <div className="col-span-11">
                                    <p className="text-sm text-green-800 font-medium">Vault Created Successfully!</p>
                                    <p className="text-xs text-green-600">Vault ID: {vaultId}</p>
                                    <p className="text-xs text-green-600">Amount: {vaultAmount} CELO</p>
                                    <p className="text-xs text-green-600">Unlocks in: {timeUnits.days}d {timeUnits.hours}h {timeUnits.minutes}m {timeUnits.seconds}s</p>
                                </div>
                            </AlertDescription >
                        </Alert>
                    )
                }
                {
                    createdVaultError && (
                        <Alert className=" bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                            <AlertDescription className="grid grid-cols-12 text-white text-md  items-center justify-center gap-2">
                                <div className="col-span-1 flex items-center justify-center">
                                    <ShieldAlert className="text-sm text-red-800 font-medium" size={40} />
                                </div>
                                <div className="col-span-11">
                                    <p className=" text-red-600 text-xl font-bold">Error creating vault</p>
                                    <p className='text-sm text-red-800 font-medium'>{createdVaultError.message}</p>
                                </div>
                            </AlertDescription >
                        </Alert>
                    )
                }
            </CardFooter>
        </Card>
    );
}