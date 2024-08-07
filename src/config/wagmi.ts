import { http, createConfig } from 'wagmi'
import { optimism, optimismSepolia, celo, baseSepolia, base, fraxtalTestnet, fraxtal} from 'wagmi/chains'
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [optimism, optimismSepolia, celo, base, baseSepolia, fraxtal, fraxtalTestnet],
    transports: {
      [optimism.id]: http(
        `https://optimism-mainnet.infura.io/v3/231b4ca4d4ed49c988f63fc1e76bd037`,
      ),
      [optimismSepolia.id]: http(
        `https://optimism-sepolia.infura.io/v3/231b4ca4d4ed49c988f63fc1e76bd037`,
      ),
      [celo.id]: http(
        `https://celo-alfajores.infura.io/v3/231b4ca4d4ed49c988f63fc1e76bd037`,
      ),
      [base.id]: http(
        `https://base-mainnet.g.alchemy.com/v2/9kDQm4NOLsXPnomPezfxUYPgdMYudqxh`,
      ),
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/9kDQm4NOLsXPnomPezfxUYPgdMYudqxh`,
      ),
      [fraxtal.id]: http(
        `https://frax-mainnet.g.alchemy.com/v2/9kDQm4NOLsXPnomPezfxUYPgdMYudqxh`,
      ),
      [fraxtalTestnet.id]: http(
        `https://frax-sepolia.g.alchemy.com/v2/9kDQm4NOLsXPnomPezfxUYPgdMYudqxh`,
      ),

    },
    walletConnectProjectId: process.env.WALLET_CONNECT_ID as string,
    appName: "Governaut",
    appDescription: "Governaut",
    // appUrl: "", 
    appIcon: "../../icons/Logo", 
  }),
);

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}