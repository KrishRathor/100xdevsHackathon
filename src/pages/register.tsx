
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useEffect, useMemo, useState } from 'react';
import { SolanaWalletProvider } from '../components/SolanaWalletProvider';
import { Header } from '../components/Header';

require('@solana/wallet-adapter-react-ui/styles.css');

const Register: React.FC = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  // State to ensure client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state if preferred
  }


  return (
    <div className='bg-[#0D1117] h-[100vh] m-0 p-0 text-white ' >
      <Header />
      <p className='text-2xl text-center p-4' >Register With Your Github Username and wallet</p>
      <WalletModalProvider>
        <div className='mx-auto w-fit my-4' ><WalletMultiButton /> </div>
        <div className='mx-auto w-fit my-4' ><WalletDisconnectButton /> </div>
        { /* Your app's components go here, nested within the context providers. */}
        <SolanaWalletProvider />
      </WalletModalProvider>
    </div>
  )
}

export default Register;

