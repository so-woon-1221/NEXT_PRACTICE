import { useQuery } from "react-query";
import axios from "../lib/api";

const getData = async () => {
  const { data } = await axios.get("api/biTest1");
  // const { data } = await axios.get("/api/apiTest");
  return data;
};

export const useDB3 = () => {
  return useQuery("DB3", getData);
};
