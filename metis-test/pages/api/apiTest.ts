import { NextApiRequest, NextApiResponse } from "next";

const sql = require("mssql");

// eslint-disable-next-line consistent-return
const connect = async () => {
  try {
    const pool = await sql.connect({
      user: "bi_user",
      password: "ztop1234!",
      server: "211.252.252.66",
      port: 1433,
      database: "DM",
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    });
    return pool;
  } catch (e) {
    console.error(e);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const pool = await connect();
      const result = await pool
        .request()
        .query("select * from test.BI_TEST_1 where category='애완동물먹이'");
      res.send(result.recordset);
    } finally {
      console.log("finish");
    }
  }
};
