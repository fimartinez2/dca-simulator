const ChartLegend = () => {
  return (
    <g>
      <rect
        x={30}
        y={0}
        height={16}
        width={24}
        fill="#6366f1"
        fillOpacity={0.3}
        stroke="#6366f1"
        strokeWidth={2}
      />
      <text x={65} y={12} fill="white" fontSize={11}>
        Wallet Value
      </text>
      <rect
        x={30}
        y={25}
        height={16}
        width={24}
        fill="white"
        fillOpacity={0.3}
        stroke="white"
        strokeWidth={2}
      />
      <text x={65} y={37} fill="white" fontSize={11}>
        Total Investment
      </text>
    </g>
  );
};

export default ChartLegend;
