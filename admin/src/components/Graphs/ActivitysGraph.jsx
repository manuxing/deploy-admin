import React, { useMemo } from "react";
import { XAxis, CartesianGrid, Line, LineChart } from "recharts";
import "./index.css"

function ActivitysGraph() {

  let data = useMemo(() => {
    return [
      {mes: "julio", activitys :10},
      {mes: "agosto", activitys :31},
      {mes: "septiembre", activitys :12},
      {mes: "octubre", activitys :15},
      {mes: "noviembre", activitys :8},
      ]; 
  }, []);
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