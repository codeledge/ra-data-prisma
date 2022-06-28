import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { AuthProvider } from "react-admin";
import { authProvider } from "../providers/authProvider";

//API handler, catches all errors and returns them as JSON
export const apiHandler =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      auth: AuthProvider
    ) => void
  ) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const session = await getSession({ req });
      if (!session) return res.status(401).json({});
      return handler(req, res, authProvider(session));
    } catch (error: any) {
      console.error(error);
      // do this or nextjs will show an entire html error response
      return res.status(error?.status || 500).json({ message: error?.message });
    }
  };
