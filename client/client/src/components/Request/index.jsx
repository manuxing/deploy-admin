import React, { useState, useEffect, useMemo } from "react";
import {NavLink} from "react-router-dom"
import { actuallContext } from "../ActualContext";
import tools from "../../tools";
import axios from "axios";
import Form from "./Form";

const RequestR = ({ setP }) => {
  let [submitted, setSubmitted] = useState(false);
  let [services, setServices] = useState([]);
  let [servicesIds, setServicesIds] = useState([]);
  let validate = tools.validate;
  let thg = [
    "telefono",
    "email",
  ];

  let [input, setInput] = useState({
    dateR: "",
    thg: "",
    contact: [],
    sId: 0,
    solicitante: "",
  });
  let [warning, setWarning] = useState({
    dateR: "",
    thg: "",
    contact: "",
    sId: "",
    solicitante: "",
  });
  
  
  let createSolicitud = (data)=>{
    console.log(data)
    axios
    .post(`http://localhost:3001/request`, data)
          .then((res) =>  {
              setSubmitted(true);
              
          })
        .catch((e) => {
          console.log(e)
            alert(e.data)
          });
          setInput({ dateP: "", thg: "", contact: [], sId: 0, solicitante:""});
          setWarning({ dateP: "", thg: "", solicitante:"", contact: "", sId: "" });
          let x = document.getElementById("service");
          x.selected = true;
        }

        let send = {
          input,
          warning,
          validate,
          services,
          createSolicitud,
          servicesIds,
          setInput,
          setWarning,
          thg
        };

  useEffect(() => {
    axios
        .get(`http://localhost:3001/data/service`)
          .then((res) =>  {
              setServices(res.data.actual.data);
              let ids = res.data.actual.data.map(p => p.id)
              setServicesIds(ids);
          })
        .catch((e) => {
          alert(e.data)
        });
        return ()=>setSubmitted(false)
  }, []);

  return (
    <div>
      {submitted === true ?
      <div>
        <p>gracias por su solicitud boton</p> 
        <NavLink to={"/home"}>home</NavLink>
        </div>:
      <div className="content_act">
        solicitud:
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>}
      </div>
  );
};

export default React.memo(RequestR);
