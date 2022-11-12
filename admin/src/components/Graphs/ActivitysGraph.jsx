import React, { useMemo, useEffect } from "react";
import { XAxis, CartesianGrid, Line, LineChart } from "recharts";
import { useSelector } from "react-redux";

function ActivitysGraph() {
  let Requests = useSelector((state) => state.actualG.data)
  useEffect(()=>{
    console.log(Requests)
  },[])

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
    <LineChart width={500} height={230} data={data}>
        <Line type="monotone" dataKey="activitys" stroke="#2196F3" strokeWidth={3} />;
        <CartesianGrid stroke="#ccc"/>
        <XAxis dataKey="mes"/>
    </LineChart>
  );
}

export default ActivitysGraph;