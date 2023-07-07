"use client";

import { Goerli } from "@thirdweb-dev/chains";
import {
  PAPER_CLIENT_ID,
  FACTORY_ADDRESS,
  THIRD_WEB_API_KEY,
} from "@/lib/constants";
import {
  ThirdwebProvider,
  localWallet,
  paperWallet,
  smartWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";

const activeChain = Goerli;

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      supportedWallets={[
        paperWallet({
          clientId: PAPER_CLIENT_ID,
        }),
        smartWallet({
          factoryAddress: FACTORY_ADDRESS,
          thirdwebApiKey: THIRD_WEB_API_KEY,
          gasless: true,
          personalWallets: [localWallet({ persist: true })],
        }),
        metamaskWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
}
