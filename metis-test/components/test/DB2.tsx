import React from "react";

interface Props {
  data: any;
}
// @ts-ignore
const DB2: React.FC<Props> = ({ data }) => {
  const a = 1;
  return (
    <div>
      {data.map((d: { category: string; nmonth: string }, i: number) => {
        return (
          <div key={i}>
            {d.category} {d.nmonth}
          </div>
        );
      })}
    </div>
  );
};

export default DB2;
