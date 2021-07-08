import axios from "axios";
import { useQuery } from "react-query";

const getData = async () => {
  const { data } = await axios.get("http://localhost:3000/api/apiTest");
  return data;
};

export const useDB3 = () => {
  return useQuery("DB3", getData);
};
