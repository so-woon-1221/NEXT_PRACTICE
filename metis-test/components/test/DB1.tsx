import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDB1 } from "../../hooks/useDB1";
import { useSelector } from "../../store";
import Gender from "../filter/Gender";
import Area from "../filter/Area";

interface dataType {
  x: any;
  y: any;
}
interface seriesType {
  name: string;
  data: Array<dataType>;
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DB1: React.FC = () => {
  const { product } = useSelector((state) => state.common);
  const [gender, setGender] = useState(["all"]);
  const [area, setArea] = useState(["all"]);

  const [series, setSeries] = useState<seriesType[]>([]);
  const options = {
    chart: {
      id: "test",
    },
  };

  const { status, data, error } = useDB1(gender, ["all"], area, 1, product);

  useEffect(() => {
    if (status === "success" && data) {
      const newSeries: Array<seriesType> = [{ name: "data", data: [] }];
      for (let i = 0; i < data?.length; i++) {
        const x = data[i].YM;
        const y = data[i].DATA;
        newSeries[0].data.push({ x, y });
      }
      setSeries(newSeries);
    }
  }, [status, data]);

  return (
    <div className="w-full h-full">
      <div className="border-b w-full h-40">
        <Gender gender={gender} setGender={setGender} />
        <Area area={area} setArea={setArea} />
      </div>
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && data && data?.length > 1 && (
        <Chart options={options} series={series} type="line" height={500} />
      )}
      {status === "success" && data && data?.length < 1 && (
        <div>데이터없음</div>
      )}
      {status === "error" && <div>오류</div>}
    </div>
  );
};

export default DB1;
