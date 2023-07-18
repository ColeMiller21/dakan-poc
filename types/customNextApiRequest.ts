import { NextApiRequest } from "next";

interface CustomNextApiRequest extends NextApiRequest {
  user?: {
    address: string;
    // Add other properties as needed
  };
}

export default CustomNextApiRequest;
