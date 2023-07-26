import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { supabase } from "@/lib/supabase/supabase";

// Here we configure thirdweb auth with a domain and wallet
export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  callbacks: {
    onLogin: async (address: string) => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("address", address);
      console.log(data);

      if (error) {
        console.log(error);
        throw error;
      }

      if (!data || data.length === 0) {
        // Create a new user entry if the user doesn't exist
        console.log("user doesnt exist");
        const { error } = await supabase
          .from("user")
          .insert([{ address: address }]);

        if (error) {
          console.log(error);
          throw error;
        }
      }

      let session = {
        address,
        message: "from on login",
      };
      return session;
    },
    onUser: async (address: any) => {
      const { data, error } = await supabase.from("user").select(``);
      if (error) {
        console.log(error);
        throw error;
      }

      const userData = data ? data[0] : {};
      console.log({ userData });
      return { address, user: userData, message: "from on user" };
    },
    onLogout: async (user: any) => {
      console.log("onLogout: ", user);
      return null;
    },
  },
  authOptions: {
    // validateNonce: async (nonce: string) => {
    //   console.log({ nonce });
    //   // Check in database or storage if nonce exists
    //   const { data, error } = await supabase
    //     .from("session_nonce")
    //     .select("*")
    //     .eq("nonce", nonce);

    //   if (error) {
    //     console.log(error);
    //     throw error;
    //   }

    //   if (data && data.length > 0) {
    //     throw new Error("Nonce has already been used!");
    //   }

    //   // Otherwise save nonce in database or storage for later validation
    //   const { error: insertError } = await supabase
    //     .from("session_nonce")
    //     .insert([{ nonce: nonce }]);

    //   if (insertError) {
    //     console.log(insertError);
    //     throw insertError;
    //   }
    // },
    tokenDurationInSeconds: 60 * 60 * 24 * 7, // 1 week
    refreshIntervalInSeconds: 60 * 60, // 1 hour
  },
});

// Use the ThirdwebAuthHandler as the default export to handle all requests to /api/auth/*
export default ThirdwebAuthHandler();
