"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { Claim } from "./claim";
import { Phygital } from "@/types/phygital";
import { supabase } from "@/lib/supabase/supabase";
import { useTheme } from "next-themes";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import UserContext from "@/context/user-context";

export function ClaimPage({ id }: { id: number }) {
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
        .eq("cert_id", id)
        .single();
      console.log({ data, error });
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
    <section className="min-h-screen w-full flex flex-col border-b border-black dark:border-white px-[1.6rem] lg:px-0 relative">
      <div className="min-h-full flex-1 w-full flex flex-col-reverse lg:flex-row mb-[100px]">
        <div className="w-full lg:w-[50%] flex-1 flex justify-center lg:items-center">
          <div className="w-full lg:w-[70%] flex flex-col">
            <div className="flex justify-between items-center w-full">
              <span className="font-bold text-[2rem] flex items-center">
                <span>{phygital?.name}</span>
              </span>
            </div>
            <div className="flex flex-col divide-y divide-gray-700/75">
              <p className="py-4 flex items-center gap-4">
                <span className="font-bold">Category: </span>
                {phygital?.category}
              </p>
              <p className="py-4 flex items-center gap-4">
                <span className="font-bold">Brand: </span>
                {phygital?.brand}
              </p>
              <div className="flex flex-col lg:flex-row lg:gap-[2rem]">
                <div className="flex gap-[2rem]">
                  <div className="flex flex-col py-4">
                    <span className="text-sm">Certification ID</span>
                    <span className="font-bold">{phygital?.cert_id}</span>
                  </div>

                  <div className="flex flex-col py-4">
                    <span className="text-sm">Quality</span>
                    <span className="font-bold">{phygital?.quality}</span>
                  </div>
                </div>
                <div className="flex gap-[2rem]">
                  <div className="flex flex-col py-4">
                    <span className="text-sm">Authentication Company</span>
                    <span className="font-bold">
                      {phygital?.authentication_company}
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-4 flex justify-center items-center">
                <div className="w-[90%]">
                  {phygital?.claimedBy !== null ? (
                    <p className="font-bold">Phygital Has Been Claimed</p>
                  ) : (
                    <Claim id={id} setPhygital={setPhygital} />
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center py-2">
                <div className="flex justify-between text-sm">
                  Token Standard
                </div>
                <span className="font-bold text-sm">ERC-1511</span>
              </div>
              <div className="flex flex-col justify-center py-2">
                <div className="flex justify-between text-sm">Blockchain</div>
                <span className="font-bold text-sm">Ethereum</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] my-[50px] lg:my-0 lg:flex-1 lg:min-h-full flex flex-col lg:flex-row items-center justify-center">
          <div className="w-[80%] aspect-square relative">
            <video width="100%" height="100%" controls loop autoPlay muted>
              <source src={phygital?.image_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
