import authMiddleware from "../middleware/authMiddleware";
import CustomNextApiRequest from "@/types/customNextApiRequest";
import { NextApiResponse } from "next";

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  // Access the user information from req.user
  const { user } = req;

  // Need to get user info from database

  return res.status(200).json({
    user,
    message: `This is a secret for ${user?.address}.`,
  });
};

export default authMiddleware(handler);
