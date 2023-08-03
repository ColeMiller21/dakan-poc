import { supabase } from "@/lib/supabase/supabase";
import { User } from "@/types/user";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { ProfileHeader } from "@/components/profile/profile-header";
import ProfileDisplay from "@/components/profile/profile-display";
export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const response: PostgrestSingleResponse<User> = await supabase
    .from("user_claim_phygital")
    .select("*")
    .eq("address", params.address)
    .single();

  // Extract data and error from the response
  const { data, error } = response;

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 max-w-8xl">
      <ProfileHeader data={data as User} />
      <ProfileDisplay />
    </div>
  );
}

export async function generateStaticParams(): Promise<{ address: string }[]> {
  const { data, error } = await supabase.from("user").select("*");
  return data!.map((d: User) => ({
    address: d.address as string,
  }));
}
