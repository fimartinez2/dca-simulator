import * as d3 from "d3";
import { useEffect, useRef } from "react";

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
      .style("font-weight", "bold");

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator).style("font-weight", "bold");
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
