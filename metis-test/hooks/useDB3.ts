import axios from "axios";
import { useQuery } from "react-query";

const getData = async () => {
  const { data } = await axios.get("http://34.136.232.169:8080/api/biTest1");
  // const { data } = await axios.get("/api/apiTest");
  return data;
};

export const useDB3 = () => {
  return useQuery("DB3", getData);
};
