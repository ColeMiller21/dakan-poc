"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Phygital } from "@/types/phygital";
import axios from "axios";

type SetPhygital = React.Dispatch<React.SetStateAction<Phygital | null>>;

interface ClaimCardProps {
  setPhygital: SetPhygital;
  id: number;
}

export function Claim({ id, setPhygital }: ClaimCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClaim = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/claim", { id });
      setPhygital(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Claiming
        </Button>
      ) : (
        <Button onClick={handleClaim}>Claim</Button>
      )}
    </div>
  );
}
