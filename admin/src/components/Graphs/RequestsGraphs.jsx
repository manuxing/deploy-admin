import React, { useMemo } from "react";
import { useEffect } from "react";
import { XAxis, CartesianGrid, Line, LineChart } from "recharts";
import { useSelector } from "react-redux";

function RequestGraph() {
  let Requests = useSelector((state) => state.actualG.data)
  useEffect(()=>{
    console.log(Requests)
  },[])

  let data = useMemo(() => {
    return [
      {name: "julio", Solicitudes :20},
      {name: "agosto", Solicitudes :3},
      {name: "septiembre", Solicitudes :10},
      {name: "octubre", Solicitudes :15},
      {name: "noviembre", Solicitudes :2},
      ]; 
  }, []);
  return (
    <LineChart width={440} height={210} data={data}>
        <Line type="monotone" dataKey="Solicitudes" stroke="#2196F3" strokeWidth={1.5} />;
        <CartesianGrid stroke="#ccc"/>
        <XAxis dataKey="name"/>
    </LineChart>
  );
}

export default RequestGraph;