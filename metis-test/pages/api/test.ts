import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      res.send("aa");
    } finally {
      res.send("finish");
    }
  }
};
