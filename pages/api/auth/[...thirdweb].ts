import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

// Here we configure thirdweb auth with a domain and wallet
export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  callbacks: {
    onLogin: async (address: string) => {
      console.log("onLogin: ", address);
      // Create a new user entry if the user doesn't exist
      // if (!await dbExample.userExists(user.address)) {
      //   await dbExample.createUser({ address: user.address });
      // }

      // You can populate data from your database or other sources
      //  const data = await dbExample.getUserData(user.address);

      //  return data;

      let session = {
        address,
        message: "from on login",
      };
      return session;
    },
    onUser: async (address: any) => {
      console.log("onUser: ", address);

      // You can populate data from your database or other sources

      console.log({ address });
      return { address, user: "USER DATA", message: "from on user" };
    },
    onLogout: async (user: any) => {
      console.log("onLogout: ", user);
      return null;
    },
  },
  authOptions: {
    validateNonce: async (nonce: string) => {
      console.log({ nonce });
      // Check in database or storage if nonce exists
      // const nonceExists = await dbExample.nonceExists(nonce);
      // if (nonceExists) {
      //   throw new Error("Nonce has already been used!");
      // }
      // Otherwise save nonce in database or storage for later validation
      // await dbExample.saveNonce(nonce);
    },
    tokenDurationInSeconds: 60 * 60 * 24 * 7, // 1 week
    refreshIntervalInSeconds: 60 * 60, // 1 hour
  },
});

// Use the ThirdwebAuthHandler as the default export to handle all requests to /api/auth/*
export default ThirdwebAuthHandler();
