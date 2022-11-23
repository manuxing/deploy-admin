import React, { useMemo } from "react";
import { useEffect } from "react";
import { XAxis, CartesianGrid, Line, LineChart } from "recharts";
import { useSelector } from "react-redux";

function RequestGraph({val}) {
  let Requests = useSelector((state) => state.actualG.data)
  useEffect(()=>{
    console.log(Requests)
  },[])

  let data = useMemo(() => {
    return [
      {mes: "julio", Solicitudes :val === "act" ? 20:3},
      {mes: "agosto", Solicitudes :val === "act" ? 32:7},
      {mes: "septiembre",  Solicitudes :val === "act" ? 11:37},
      {mes: "octubre", Solicitudes :val === "act" ? 22:12},
      {mes: "noviembre", Solicitudes :val === "act" ? 4:11},
      ]; 
  }, [val]);
  return (
    <LineChart width={440} height={210} data={data}>
        <Line type="monotone" dataKey="Solicitudes" stroke="#2196F3" strokeWidth={1.5} />;
        <CartesianGrid stroke="#ccc"/>
        <XAxis dataKey="name"/>
    </LineChart>
  );
}

export default RequestGraph;