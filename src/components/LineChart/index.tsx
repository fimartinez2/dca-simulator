import getFirstDayOfMonth from "@/helpers/functions/getFirstDayOfMonth";
import * as d3 from "d3";
import ChartAxes from "./Axes";
import { useEffect, useRef } from "react";

type LineChartProps = {
  width: number;
  height: number;
  startDate: Date;
  endDate: Date;
  data: { x: Date; y: number }[];
  investment: { x: Date; y: number }[];
};
const MARGIN = { top: 60, right: 30, bottom: 70, left: 60 };

const LineChart = (props: LineChartProps) => {
  const { width, height, startDate, endDate, data, investment } = props;

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const maxY = d3.max(data, (d) => d.y);

  const svgRef = useRef(null);

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

  useEffect(() => {}, [startDate, endDate, data, investment]);
  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>
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
            stroke="#6366f1"
            fill="none"
            strokeWidth={2}
          />
          <path
            d={`${
              linePath ?? ""
            } L ${boundsWidth} ${boundsHeight} L 0 ${boundsHeight}`}
            fill="#6366f1"
            opacity={0.3}
          />
        </g>
        <ChartAxes
          xScale={xScale}
          yScale={yScale}
          boundsHeight={boundsHeight}
          boundsWidth={boundsWidth}
          MARGIN={MARGIN}
        />
        {data.map((dot, index) => {
          return (
            <circle
              key={index}
              cx={xScale(dot.x) + MARGIN.left}
              cy={yScale(dot.y) + MARGIN.top}
              r={3}
              fill="#6366f1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default LineChart;
