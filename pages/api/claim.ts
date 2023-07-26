import authMiddleware from "../middleware/authMiddleware";
import CustomNextApiRequest from "@/types/customNextApiRequest";
import { NextApiResponse } from "next";
import { supabase } from "@/lib/supabase/supabase";

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  // Access the user information from req.user
  const { user } = req;
  const { id } = req.body;

  const { data, error } = await supabase
    .from("claim_phygital")
    .update({ claimedBy: user?.address })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ error });
  } else {
    console.log("Data updated successfully:", data);
  }

  return res.status(200).json({
    message: `Successfully claimed token ${id} by ${user?.address}`,
    data,
  });
};

export default authMiddleware(handler);
