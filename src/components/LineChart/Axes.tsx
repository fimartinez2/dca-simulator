import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
interface Props {
  xScale: d3.ScaleTime<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  boundsHeight: number;
  boundsWidth: number;
  MARGIN: { top: number; right: number; bottom: number; left: number };
}

const ChartAxes = (props: Props) => {
  const axesRef = useRef(null);
  const { xScale, yScale, boundsHeight, boundsWidth, MARGIN } = props;
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator)
      .style("font-weight", "bold")
      .attr("class", inter.className)
      .selectAll("text")
      .attr("class", "x-axis");

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement
      .append("g")
      .call(yAxisGenerator)
      .style("font-weight", "bold")
      .style("font-size", "8px")
      .attr("class", inter.className);

    svgElement
      .selectAll(".x-axis")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-65) translate(-10, -5)");
    // .attr("transform", "translate(0, 3)");
  }, [xScale, yScale, boundsHeight]);
  return (
    <g
      width={boundsWidth}
      height={boundsHeight}
      ref={axesRef}
      transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
    />
  );
};

export default ChartAxes;
