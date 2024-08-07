import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from 'next/app';
import Navbar from '@/components/navbar';
import { WagmiProvider } from 'wagmi'
import { config } from '@/config/wagmi';
import { ConnectKitProvider } from 'connectkit';
import '../config/styles.css';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider> 
          <Navbar />
          <Component {...pageProps} />
        </ConnectKitProvider> 
      </QueryClientProvider>
    </WagmiProvider>
  );
}
