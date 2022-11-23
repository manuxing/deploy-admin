import React, { useMemo } from "react";
import { XAxis, CartesianGrid, Line, LineChart } from "recharts";
import "./index.css"

function ActivitysGraph({val}) {
  let data = useMemo(() => {
    return [
      {mes: "julio", activitys :val === "act" ? 10:30},
      {mes: "agosto", activitys :val === "act" ? 31:9},
      {mes: "septiembre",  activitys :val === "act" ? 14:20},
      {mes: "octubre", activitys :val === "act" ? 19:18},
      {mes: "noviembre", activitys :val === "act" ? 4:11},
      ]; 
  }, [val]);
  return (
    <div className="chart">
      <LineChart width={430} height={210} data={data}>
          <Line type="monotone" dataKey="activitys" stroke="#2186F2" strokeWidth={1.5} />;
          <CartesianGrid stroke="#ccc"/>
          <XAxis dataKey="mes"/>
      </LineChart>
    </div>
  );
}

export default ActivitysGraph;