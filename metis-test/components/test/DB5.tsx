import React, { useCallback, useEffect, useState } from "react";
import * as d3 from "d3";
import Age from "../filter/Age";
import Gender from "../filter/Gender";
import { useDB5 } from "../../hooks/useDB5";
import useResizeObserver from "../../hooks/useResizeObserver";

const DB5: React.FC = () => {
  const [age, setAge] = useState(["all"]);
  const [gender, setGender] = useState(["all"]);
  const wrapperRef = React.useRef();
  const dimension = useResizeObserver(wrapperRef);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (dimension) {
      // @ts-ignore
      setWidth(dimension.width);
    }
  }, [dimension]);

  const { status, data, error } = useDB5(gender, age, "클렌징");

  const drawChart = useCallback(() => {
    if (
      status === "success" &&
      data &&
      width &&
      data.result.recordset.length > 1
    ) {
      let svg: d3.Selection<any, any, any, any>;
      if (document.getElementById("chart")) {
        svg = d3.select("#chart");
      } else {
        svg = d3.select("#wrapper").append("svg");
        svg.attr("id", "chart").attr("width", width).attr("height", 500);
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg.append("g").attr("id", "legend");
        svg.append("g").attr("id", "chartArea");
      }

      svg.selectAll(".chartRect").remove();

      const rank = ["0", "1", "2", "3", "4"];

      const createTooltip = () => {
        d3.select("#wrapper")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip");

        return d3.select(".tooltip");
      };

      if (!document.querySelector(".tooltip")) {
        createTooltip();
      }
      const tooltip = d3.select(".tooltip");

      const getNewData = () => {
        const nest = d3.group(data.result.recordset, (d) => d.YM);
        const newData = [];
        const monthArray = [];
        const brandData = new Map();
        for (const key of nest.keys()) {
          const tempData = nest.get(key);
          newData.push({
            YM: key,
            "0": tempData[0].BCI,
            "1": tempData[1].BCI,
            "2": tempData[2].BCI,
            "3": tempData[3].BCI,
            "4": tempData[4].BCI,
          });
          brandData.set(
            `${key}${tempData[0].BCI}`,
            `${tempData[0].COM}-${tempData[0].BRAND}`,
          );
          brandData.set(
            `${key}${tempData[1].BCI}`,
            `${tempData[1].COM}-${tempData[1].BRAND}`,
          );
          brandData.set(
            `${key}${tempData[2].BCI}`,
            `${tempData[2].COM}-${tempData[2].BRAND}`,
          );
          brandData.set(
            `${key}${tempData[3].BCI}`,
            `${tempData[3].COM}-${tempData[3].BRAND}`,
          );
          brandData.set(
            `${key}${tempData[4].BCI}`,
            `${tempData[4].COM}-${tempData[4].BRAND}`,
          );
          monthArray.push(key);
        }
        return { newData, monthArray, brandData };
      };

      const { newData, monthArray, brandData } = getNewData();

      const x = d3
        .scaleBand()
        .domain(monthArray)
        .range([80, width - 50])
        .padding(0.1);
      const xAxis = d3
        .select("#xAxis")
        .attr("transform", "translate(0, 450)")
        .call(
          // @ts-ignore
          d3.axisBottom(x).ticks(monthArray.length),
        );

      const y = d3.scaleLinear().domain([0, 100]).range([450, 20]);
      const yAxis = d3
        .select("#yAxis")
        .attr("transform", "translate(80,0)")
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal().domain(rank).range(d3.schemeAccent);

      const stackedData = d3.stack().keys(rank)(newData);

      // @ts-ignore
      svg
        .selectAll("chartRect")
        .data(stackedData)
        .join("g")
        .attr("fill", (d) => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d) => d)
        .join("rect")
        .attr("class", (d) => `chartRect ${d.data.YM}`)
        .attr("x", (d) => x(d.data.YM))
        .on("mouseover", (e, d) => {
          tooltip.style("opacity", 1);
          const ym = e.target.classList[1];
          const bci = d[1] - d[0];
          const brand = brandData.get(`${ym}${bci}`);
          // eslint-disable-next-line no-template-curly-in-string
          tooltip.html(`<p>${brand}</p><p>${bci}</p>`);
        })
        .on("mousemove", (e, d) => {
          tooltip
            .style("top", `${d3.pointer(e)[1] + 10}px`)
            .style("left", `${d3.pointer(e)[0]}px`);
        })
        .on("mouseleave", (e, d) => {
          tooltip.style("opacity", 0);
        })
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]));
    }
    return null;
  }, [status, data, width]);

  return (
    <div className="relative">
      <Age age={age} setAge={setAge} isArray={false} />
      <Gender gender={gender} setGender={setGender} isArray={false} />
      {/*@ts-ignore*/}
      <div className="relative w-full" id="wrapper" ref={wrapperRef}>
        {status === "loading" && (
          <div className="absolute top-4 left-1/2">로딩중</div>
        )}
        {status === "success" && data && drawChart()}
      </div>
    </div>
  );
};

export default DB5;
