import React, { useEffect, useState } from 'react';
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { Copy, LogOut } from 'lucide-react';

const WalletPage: React.FC = () => {
    const [publicKey, setPublicKey] = useState('')
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState<number | null>(null)
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const generateAddress = (publicKey: string) => {
        if (!publicKey) {
            alert('Please enter a public key');
            return;
        }
        try {
            const key = new PublicKey(publicKey);
            setAddress(key.toBase58());
        } catch (error) {
            alert('Error. Invalid public key');
        }
    };

    const getWalletBalance = async () => {
        if(address){
            try {
                const balanceInLamports = await connection.getBalance(new PublicKey(address));
                const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
                setBalance(balanceInSOL);
            } catch(error) {
                console.error('Error fetching balance:', error);
            }
        }
    }

    useEffect(() => {
        getWalletBalance();
    }, [address])

    const copy = () => {
        navigator.clipboard.writeText(publicKey);
        alert('Public key copied!');
    };

    const logOut = () => {
        setAddress('')
        setPublicKey('')
    }

    return (
        <>
        {address ? (
            <div className='relative h-[350px]'>
                <div className="flex flex-col gap-y-4 mt-4 text-slate-100">
                    <div className='w-64 relative overflow-hidden bg-slate-400 py-2 px-2 mx-auto rounded-lg border border-slate-800'>
                        <p>{address}</p>
                        <div onClick={copy} className='w-10 h-10 flex items-center justify-center absolute right-0 top-0 bg-slate-500 border-l border-l-slate-800 rounded-lg cursor-pointer'>
                            <Copy />
                        </div>
                    </div>
                    <h2 className='text-xl font-semibold p-4'>Balances</h2>
                    <div className='flex flex-row gap-4 items-center bg-slate-600 p-4 rounded-xl font-semibold'>
                        <img src='/solana-sol-logo.png' alt='' width={40} height={40} className='bg-slate-900 p-2 rounded-full'/>
                        <div>{balance?.toFixed(2)} SOL</div>
                    </div>
                </div>
                <div onClick={logOut} className='absolute bottom-0 right-0 px-4 py-2 m-2 bg-slate-800 text-xs text-slate-200 flex flex-row gap-2 rounded-lg border border-slate-400 cursor-pointer'>
                    Log Out <LogOut className='w-4 h-4'/>
                </div>
            </div>
            ) : (
            <div className="flex flex-col gap-y-6 mt-16">
                <input type="text" id="publicKeyInput" placeholder="Enter your public key" className='w-64 rounded-lg px-4 py-2 mx-auto'  value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}/>
                <button className='w-fit px-4 py-1 border-[1px] rounded-lg bg-slate-700 text-slate-200 font-semibold border-slate-500 mx-auto' onClick={() => {generateAddress(publicKey)}}>Add wallet</button>
            </div>
            )
        }
        </>
    );
};

export default WalletPage;
