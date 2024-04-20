import getFirstDayOfMonth from "@/helpers/functions/getFirstDayOfMonth";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

type LineChartProps = {
  width: number;
  height: number;
  startDate: Date;
  endDate: Date;
  data: { x: Date; y: number }[];
  investment: { x: Date; y: number }[];
};
const MARGIN = { top: 60, right: 30, bottom: 50, left: 60 };

const LineChart = (props: LineChartProps) => {
  const { width, height, startDate, endDate, data, investment } = props;
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const maxY = d3.max(data, (d) => d.y);
  //get start an ande dates on the pegining of the month

  const xScale = d3
    .scaleTime()
    .domain([getFirstDayOfMonth(startDate), getFirstDayOfMonth(endDate)])
    .range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([0, maxY!]).range([boundsHeight, 0]);
  const lineBuilder = d3
    .line<{ x: Date; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  const linePath = lineBuilder(data);
  const investmentLinePath = lineBuilder(investment);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={investmentLinePath ?? undefined}
            stroke="white"
            fill="none"
            strokeWidth={2}
          />
          <path
            d={linePath ?? undefined}
            stroke="red"
            fill="none"
            strokeWidth={2}
          />
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};

export default LineChart;
