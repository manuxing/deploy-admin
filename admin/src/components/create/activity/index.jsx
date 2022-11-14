import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actuallContext } from "../ActualContext";
import Form from "./Form";
import "./Form.css";
import {
  getServicio,
  createActividades,
  setActualG,
  setActual,
  errorForm,
  getClient,
} from "../../../redux/actions";
import tools from "../../../tools";

const ActivityR = ({ setP }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let validate = tools.validate;

  let actual = useSelector((state) => state.actual);
  let services = useSelector((state) => state.servicios);
  let clientes = useSelector((state) => state.clientes);
  let errForm = useSelector((state) => state.errForm);
  
  let clientsNames = useMemo(()=>clientes.map(p=> p.name), [clientes]);
  let servicesIds = useMemo(()=>services.map(p=> p.id), [services]);
  
  let [input, setInputA] = useState({
    name: "",
    date: "",
    persons: [],
    sId: 1000,
  });
  let [warningA, setWarningA] = useState({
    name: "",
    date: "",
    persons: "",
    sId: "",
    general: "",
  });

  let send = {
    input,
    warningA,
    validate,
    services,
    dispatch,
    servicesIds,
    clientsNames,
    createActividades,
    setInputA,
    setWarningA,
  };
    
  useEffect(() => {
    dispatch(getServicio());
    dispatch(getClient());
  }, [dispatch]);

  useEffect(() => {
    if(errForm && errForm?.data){
      alert(errForm.data)
      dispatch(errorForm());
    }
  }, [errForm]);

  useEffect(() => {
    if (actual !== 1 && input.date === actual.date) {
      tools.alert("actividad",
        `/activity/${actual.id}`,
        history, dispatch,
        setActualG, "activity",
        setP, setActual);
      setInputA({ name: "", date: "", persons: [], sId: 1000 });
      setWarningA({ name: "", date: "", persons: "", sId: "" });
      let x = document.getElementById("service");
      x.selected = true;
    }
  }, [actual]);

  return (
    <div>
      <div className="preform">
        <div className="titlef">
          <h2>Crear Actividad</h2>
        </div>
        <div>
          <actuallContext.Provider value={send}>
            <Form/>
          </actuallContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActivityR);
