import React, { useState, useEffect, useMemo } from "react";
import { actuallContext } from "../ActualContext";
import {NavLink} from "react-router-dom"
import axios from "axios"
import Form from "./Form";
import tools from "../../tools";

const ReviewR = () => {
  let [submitted, setSubmitted] = useState(false);
  let [services, setServices] = useState([]);
  let [servicesIds, setServicesIds] = useState([]);
  let validate = tools.validate;

  let [input, setInput] = useState({
    description: "",
    dateR: "",
    sId: 0,
    cName: "",
  });
  let [warning, setWarning] = useState({
    description: "",
    dateR: "",
    sId: "",
    cName: "",
  });

  let createReviews = (data)=>{
    axios
    .post(`http://localhost:3001/review`, data)
    .then((res) =>  {
      setSubmitted(true);
      
    })
    .catch((e) => {
      console.log(e)
      alert(e.data)
    });
    let x = document.getElementById("service");
        x.selected = true;
        setInput({description: "", dateR: "",
             sId: 0, cName: ""});
        setWarning({description: "", dateR: "",
             sId: "", cName: ""});
  }
  let send = {
    input,
    warning,
    validate,
    services,
    servicesIds,
    createReviews,
    setInput,
    setWarning,
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
        Reseña:
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
      </div>}
    </div>
  );
};

export default React.memo(ReviewR);
