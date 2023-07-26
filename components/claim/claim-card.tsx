"use client";
import { useState, useEffect, useContext } from "react";
import { Claim } from "./claim";
import { Phygital } from "@/types/phygital";
import { supabase } from "@/lib/supabase/supabase";
import { useTheme } from "next-themes";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import UserContext from "@/context/user-context";

export function ClaimCard({ id }: { id: number }) {
  const { user, loading, isLoggedIn } = useContext(UserContext);
  const { theme } = useTheme();
  const address = useAddress();
  const [phygital, setPhygital] = useState<Phygital | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPhygitalById = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("claim_phygital")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) {
        setPhygital(data);
      }
      setIsLoading(false);
    };
    getPhygitalById();
  }, []);

  if (!isLoggedIn && !loading) {
    return (
      <ConnectWallet
        theme={theme as "light" | "dark"}
        btnTitle="Login"
        modalTitle="Login to Dakan"
        className={!address ? `custom-btn-main` : ""}
      />
    );
  }

  if (loading) {
    return <div>Loading User....</div>;
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {isLoading ? (
        <h2>Phygital Loading...</h2>
      ) : (
        <>
          <p className="font-bold">{phygital?.metadata}</p>
          <video width="320" height="240" controls loop autoPlay muted>
            <source src={phygital?.image_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {phygital?.claimedBy !== null ? (
            <p className="font-bold">Phygital Has Been Claimed</p>
          ) : (
            <Claim id={id} setPhygital={setPhygital} />
          )}
        </>
      )}
    </div>
  );
}
