import * as d3 from "d3"; // we will need d3.js
import { useEffect } from "react";

type LineChartProps = {
  width: number;
  height: number;
  startDate: Date;
  endDate: Date;
  data: { x: number; y: number }[];
};

const LineChart = (props: LineChartProps) => {
  const { width, height, startDate, endDate, data } = props;
  // const xScale = d3.scaleTime().domain([startDate, endDate]).range([0, width]);
  // get max x and y values
  const maxX = d3.max(data, (d) => d.x);
  const maxY = d3.max(data, (d) => d.y);
  const xScale = d3.scaleLinear().domain([0, maxX!]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, maxY!]).range([height, 0]);
  const lineBuilder = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  const linePath = lineBuilder(data);
  return (
    <div>
      <svg width={width} height={height}>
        <g>
          <path
            d={linePath ?? undefined}
            stroke="white"
            fill="none"
            strokeWidth={2}
          />
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
