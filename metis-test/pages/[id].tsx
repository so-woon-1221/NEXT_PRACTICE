import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DB1 from "../components/test/DB1";

const TestPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <Head>
        <title>METIS</title>
      </Head>
      <div className="w-full h-full pt-4 md:pl-8 pl-4 pr-4">
        <div className="min-h-full overflow-y-auto border-b flex flex-col">
          <h1 className="font-extrabold text-3xl border-b-2 p-2 mb-4">
            {query.id}
          </h1>
          <div className="flex-grow border-2">
            {query.id === "menu1" && <DB1 />}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
