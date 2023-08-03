"use client";
import React, { useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { Phygital } from "@/types/phygital";
import { Button } from "../ui/button";
import UserContext from "@/context/user-context";
import { useTheme } from "next-themes";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import useCheckBalance from "@/hooks/useCheckBalance";
import InfiniteScroll from "react-infinite-scroll-component";
import { GridLoader } from "./grid-loader";

const pageSize = 10;

export function ClaimGrid() {
  const { user, loading, isLoggedIn } = useContext(UserContext);
  const { theme } = useTheme();
  const address = useAddress();
  const [phygitals, setPhygitals] = useState<Phygital[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { hasNFTs, loading: balanceCheckLoading } = useCheckBalance();

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    const { data, error } = await supabase
      .from("claim_phygital")
      .select("*")
      .range(phygitals.length, phygitals.length + pageSize - 1);

    if (error) {
      console.error(error);
      setHasMore(false);
      return;
    }

    if (data.length < pageSize) {
      setHasMore(false);
    }

    setPhygitals((prevPhygitals) => [...prevPhygitals, ...data]);
  };

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

  if (isLoggedIn && !hasNFTs) {
    return (
      <div className="w-full flex flex-col gap-12 justify-center items-center mt-4">
        <h2 className="font-extrabold text-2xl">
          You have no NFTs to claim a phygital
        </h2>
        <Button asChild>
          <Link href="/pass">Go To Pass</Link>
        </Button>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={phygitals.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<GridLoader />}
      // endMessage={
      //   <p style={{ textAlign: "center" }}>
      //     <b>Yay! You have seen it all</b>
      //   </p>
      // }
      className="mx-auto max-w-screen-xl px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center"
    >
      {phygitals.map((d, index) => (
        <div
          className="flex flex-col items-center space-y-4 p-4"
          key={d.image_url}
        >
          <video width="320" height="240" controls loop autoPlay muted>
            <source src={d.image_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-center font-bold">{d.name}</p>
          {d.claimedBy !== null ? (
            <Button variant={"secondary"} disabled>
              Claimed
            </Button>
          ) : (
            <Button asChild>
              <Link href="/claim/[id]" as={`/claim/${d.cert_id}`}>
                Go To Claim
              </Link>
            </Button>
          )}
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default ClaimGrid;
