import { getUser } from "../api/auth/[...thirdweb]";
import { NextApiRequest, NextApiResponse } from "next";
import CustomNextApiRequest from "../../types/customNextApiRequest";

const authMiddleware =
  (handler: any) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
    try {
      // Get the user off the request
      const user = await getUser(req);
      console.log({ user });

      // Check if the user is authenticated
      if (!user) {
        return res.status(401).json({
          message: "Not authorized.",
        });
      }

      // Add the user object to the request for future handlers to access
      req.user = user;

      // Call the next middleware or handler
      return handler(req, res);
    } catch (error) {
      // Handle any errors that occurred during middleware execution
      return res.status(500).json({
        message: "An error occurred.",
      });
    }
  };

export default authMiddleware;
