import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { SolanaWalletProvider } from "./SolanaWalletProvider";

interface IPrItem {
  username: string,
  publicAdress: string,
  url: string
}

export const PrItem: React.FC<IPrItem> = (props) => {

  const { username, url, publicAdress } = props;
  const { publicKey, sendTransaction } = useWallet();

  const approveBounty = useCallback(async () => {

    if (!publicKey) {
      toast("Connect your wallet first");
      return;
    }

    const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/dPdwJECWHH8dEvfOvb_q6PYDoK0CL21g', 'confirmed');

    // Example: Sending 0.01 SOL
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(publicAdress), // replace with the recipient's public key
        lamports: 0.01 * 1e9, // 0.01 SOL (1 SOL = 1e9 lamports)
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction signature', signature);
      toast('Transaction done');

    } catch (error) {
      console.error('Transaction failed', error);
    }

  }, [publicKey, sendTransaction])

  return (
    <div
      className="flex justify-between items-center p-4 mb-4 bg-[#0C0A09] shadow rounded-lg"
    >
      <span className="text-lg font-semibold">{username}</span>
      <a
        className="px-4 ml-48 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
        href={url}
        target="_blank"
      >
        View on github
      </a>
      <button
        className="px-4 py-2 ml-8 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
        onClick={approveBounty}
      >
        Approve Bounty
      </button>
      <WalletModalProvider>
        <div className='w-fit my-4' ><WalletMultiButton /> </div>
        <div className='w-fit my-4' ><WalletDisconnectButton /> </div>
        { /* Your app's components go here, nested within the context providers. */}
      </WalletModalProvider>
    </div>
  )
}
