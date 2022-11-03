import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actuallContext } from "../ActualContext";
import Form from "./Form";
import {
  getServicio,
  createActividades,
  getActividades,
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

  let clientsNames = clientes.map(p=> p.name);
  let servicesIds = services.map(p=> p.id);
  
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
        getActividades,
        setP, setActual);
      setInputA({ name: "", date: "", persons: [], sId: 1000 });
      setWarningA({ name: "", date: "", persons: "", sId: "" });
      let x = document.getElementById("service");
      x.selected = true;
    }
  }, [actual, input]);

  return (
    <div>
      <div className="content_act">
        Actividad:
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default React.memo(ActivityR);
