"use client";
import { useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { Phygital } from "@/types/phygital";
import { Button } from "../ui/button";
import UserContext from "@/context/user-context";
import { useTheme } from "next-themes";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

export function ClaimGrid() {
  const { user, loading, isLoggedIn } = useContext(UserContext);
  const { theme } = useTheme();
  const address = useAddress();
  const [phygitals, setPhygitals] = useState<Phygital[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPhygitals = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("claim_phygital").select("*");
      if (!error) {
        setPhygitals(data);
      }
      setIsLoading(false);
    };
    getPhygitals();
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
    <div className="mx-auto max-w-screen-xl px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 place-items-center">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <h2 className="font-extrabold text-2xl">Loading Phygitals....</h2>
        </div>
      ) : (
        phygitals?.map((d: any) => {
          return (
            <div
              className="flex flex-col items-center space-y-4 p-4"
              key={d.image_url}
            >
              <video width="320" height="240" controls loop autoPlay muted>
                <source src={d.image_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-center font-bold">{d.metadata}</p>
              {d.claimedBy !== null ? (
                <Button variant={"secondary"} disabled>
                  Claimed
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/claim/[id]" as={`/claim/${d.id}`}>
                    Go To Claim
                  </Link>
                </Button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
