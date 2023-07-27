"use client";

import { Goerli } from "@thirdweb-dev/chains";
import {
  PAPER_CLIENT_ID,
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
        metamaskWallet(),
      ]}
      authConfig={{
        // Set this to your domain to prevent signature malleability attacks.
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
        authUrl: "/api/auth",
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
