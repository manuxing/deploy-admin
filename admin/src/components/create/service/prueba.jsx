import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicio,
  setActual,
  getServicio,
  errorForm
} from "../../../redux/actions/index.js";
import { actuallContext } from "../ActualContext";
import Form from "./Form.jsx";
import tools from "../../../tools";
// import "./Form.css";

const AgregarServicio = ({ setP }) => {
  let validate = tools.validate;
  let dispatch = useDispatch();
  const history = useHistory();

  let actual = useSelector((state) => state.actual);
  let errForm = useSelector((state) => state.errForm);
  
  let [input, setInput] = useState({ name: "", description: "", tR: "", tR_: "" });
  let [warning, setWarning] = useState({ name: "", description: "", tR: "", tR_: ""});

  let send = {
    input,
    warning,
    validate,
    dispatch,
    createServicio,
    setInput,
    setWarning,
  };

  useEffect(() => {
    if(errForm && errForm?.data){
      alert(errForm.data)
      dispatch(errorForm());
    }
  }, [errForm]);

  useEffect(() => {
      if (typeof actual !== "number") {
        tools.alert(
          "servicio",
          `/service/${actual.id}`,
          history,
          dispatch,
          getServicio,
          setP,
          setActual
        );
        setInput({ name: "", description: "", tR: "", tR_: "" });
        setWarning({ name: "", description: "", tR: "", tR_: "" });
      }
  }, [actual]);

  return (
    <div>
      <div className="content_act">
        Servicio:
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default React.memo(AgregarServicio);
