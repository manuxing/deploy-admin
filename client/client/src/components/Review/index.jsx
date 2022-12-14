import React, { useState, useEffect } from "react";
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
    .post(` ${process.env.REACT_APP_API_URL}review`, data)
    .then((res) =>  {
      setSubmitted(true);
      
    })
    .catch((e) => {
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
        .get(` ${process.env.REACT_APP_API_URL}data/service`)
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
    <div className="re">
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
      </div>}
    </div>
  );
};

export default React.memo(ReviewR);
