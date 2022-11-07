import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServicio,
  createSolicitud,
  setActualG,
  setActual,
  errorForm
} from "../../../redux/actions";
import { actuallContext } from "../ActualContext";
import Form from "./Form";
import tools from "../../../tools";

const RequestR = ({ setP }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let validate = tools.validate;

  let actual = useSelector((state) => state.actual);
  let services = useSelector((state) => state.servicios);
  let errForm = useSelector((state) => state.errForm);
  let servicesIds = useMemo(()=>services.map(p=> p.id),[services])
  let thg = [
    "telefono",
    "email",
    "presencial",
    "pagina",
    "booking",
    "otro",
  ];

  let [input, setInput] = useState({
    dateR: "",
    dateP: "",
    thg: "",
    contact: [],
    sId: 0,
    solicitante: "",
  });
  let [warning, setWarning] = useState({
    dateR: "",
    dateP: "",
    thg: "",
    contact: "",
    sId: "",
    solicitante: "",
  });

  let send = {
    input,
    warning,
    validate,
    services,
    dispatch,
    servicesIds,
    createSolicitud,
    setInput,
    setWarning,
    thg
  };

  useEffect(() => {
    if(errForm && errForm?.data){
      alert(errForm.data)
      dispatch(errorForm());
    }
  }, [errForm]);

  useEffect(() => {
    dispatch(getServicio());
  }, [dispatch]);

  useEffect(() => {
    if (actual !== 1) {
      tools.alert(
        "solicitud",
        `/request/${actual.id}`,
        history,
        dispatch,
        setActualG, "request",
        setP,
        setActual
      );
      setInput({ dateR: "", dateP: "", thg: "", contact: [], sId: 0, solicitante:""});
      setWarning({ dateR: "", dateP: "", thg: "", solicitante:"", contact: "", sId: "" });
      let x = document.getElementById("service");
      x.selected = true;
    }
  }, [actual, input]);

  return (
    <div>
      <div className="content_act">
        solicitud:
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default React.memo(RequestR);
