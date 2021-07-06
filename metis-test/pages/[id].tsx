import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const TestPage = () => {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    console.log(query.id);
  }, []);
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
          <div className="w-full pl-2 border h-48">sub menu</div>
          <div className="flex-grow border-2">Detail</div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
