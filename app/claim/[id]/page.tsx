import { supabase } from "@/lib/supabase/supabase";
import { Phygital } from "@/types/phygital";
import { ClaimCard } from "@/components/claim/claim-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 mt-12">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl flex items-center">
        <Link
          href="/claim"
          className="text-[1rem] mr-6 font-normal flex items-center"
        >
          <span className="mr-2">
            <ArrowLeft />
          </span>
          Back to Claims
        </Link>
        Claim Page for {params.id}
      </h1>
      <ClaimCard id={params.id as number} />
    </div>
  );
}

export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("claim_phygital") // Your table name
    .select("*");
  if (!data) return;
  return data.map((d: Phygital) => ({
    id: d.id.toString(),
  }));
}
