import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DB1 from "../components/test/DB1";
import { useSelector } from "../store";
import DB2 from "../components/test/DB2";
import DB3 from "../components/test/DB3";
<<<<<<< HEAD
import DB4 from "../components/test/DB4";
=======
>>>>>>> 2f970772df76a0ec9e07cc175c39b1fd84a8b865

// @ts-ignore
const TestPage = () => {
  const router = useRouter();
  const { query } = router;
  const { product } = useSelector((state) => state.common);

  return (
    <>
      <Head>
        <title>{product + query.id}</title>
      </Head>
      <div className="md:w-200 h-full pt-4 md:pl-8 pl-4 pr-4 mx-auto">
        <div className="min-h-full overflow-y-auto flex flex-col">
          <h1 className="font-extrabold text-3xl border-b-2 p-2 mb-4">
            {query.id}
          </h1>
          <div className="flex-grow">
            {query.id === "menu1" && <DB1 />}
            {query.id === "menu2" && <DB2 />}
            {query.id === "menu3" && <DB3 />}
<<<<<<< HEAD
            {query.id === "menu4" && <DB4/>}
=======
>>>>>>> 2f970772df76a0ec9e07cc175c39b1fd84a8b865
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
