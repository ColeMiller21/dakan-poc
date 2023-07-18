"use client";
import { Web3Provider } from "./web3-provider";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "./user-provider";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Web3Provider>
        <UserProvider>{children}</UserProvider>
      </Web3Provider>
    </ThemeProvider>
  );
};
