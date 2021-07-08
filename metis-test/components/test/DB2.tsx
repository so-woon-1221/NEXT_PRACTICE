import React from "react";
import axios from "axios";

interface Props {
  data: any;
}
// @ts-ignore
const DB2: React.FC<Props> = ({ data }) => {
  const a = 1;
  return <div>{data[0].category}</div>;
};

export default DB2;
