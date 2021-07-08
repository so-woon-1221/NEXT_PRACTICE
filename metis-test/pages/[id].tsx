import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import DB1 from "../components/test/DB1";
import { useSelector } from "../store";
import DB2 from "../components/test/DB2";

// @ts-ignore
const TestPage = ({ data }) => {
  const router = useRouter();
  const { query } = router;
  const { product } = useSelector((state) => state.common);

  return (
    <>
      <Head>
        <title>{product + query.id}</title>
      </Head>
      <div className="w-full h-full pt-4 md:pl-8 pl-4 pr-4">
        <div className="min-h-full overflow-y-auto flex flex-col md:px-20">
          <h1 className="font-extrabold text-3xl border-b-2 p-2 mb-4">
            {query.id}
          </h1>
          <div className="flex-grow">
            {query.id === "menu1" && <DB1 />}
            {query.id === "menu2" && <DB2 data={data} />}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await axios.get("http://localhost:8080/api/biTest1");
  console.log(data.data);
  return { props: { data: data.data } };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "menu2" } }],
    fallback: true,
  };
}

export default TestPage;
