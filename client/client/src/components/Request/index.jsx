import React, { useState, useEffect, useMemo } from "react";
import {NavLink} from "react-router-dom"
import { actuallContext } from "../ActualContext";
import tools from "../../tools";
import axios from "axios";
import Form from "./Form";
import "./index.css"
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
    .post(` ${process.env.REACT_APP_API_URL}request`, data)
          .then((res) =>  {
              setSubmitted(true);
              
          })
        .then(res => {
            setInput({ dateP: "", thg: "", contact: [], sId: 0, solicitante:""});
            setWarning({ dateP: "", thg: "", solicitante:"", contact: "", sId: "" });
            let x = document.getElementById("service");
            x.selected = true;
          }
        )
        .catch((e) => {
            alert(e.response.data)
          });
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
        .get(` ${process.env.REACT_APP_API_URL}data/service`)
          .then((res) =>  {
              setServices(res.data.actual.data);
              let ids = res.data.actual.data.map(p => p.id)
              setServicesIds(ids);
          })
        .catch((e) => {
          console.log(e.data)
          alert(e.data)
        });
        return ()=>setSubmitted(false)
  }, []);

  return (
    <div>
      {submitted === true ?
      <div className="post">
        <h1>Gracias por su solicitud</h1> 
        <br></br>
        <NavLink className={"linkpost"} to={"/"}>
          <h2>
            Inicio
          </h2>
        </NavLink>
        </div>:
      <div className="conten_act">
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
        </div>
      }
      </div>
  );
};

export default React.memo(RequestR);
