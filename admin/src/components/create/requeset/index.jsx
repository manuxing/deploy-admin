import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServicio,
  createSolicitud,
  errorForm
} from "../../../redux/actions";
import { actuallContext } from "../ActualContext";
import Form from "./Form";
import tools from "../../../tools";

const RequestR = () => {
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
    if (actual !== 1 && input.dateR === actual.dateR) {
      tools.alert(
        "solicitud",
        `/request/${actual.id}`,
        history,
      );
      setInput({ dateR: "", dateP: "", thg: "", contact: [], sId: 0, solicitante:""});
      setWarning({ dateR: "", dateP: "", thg: "", solicitante:"", contact: "", sId: "" });
      let x = document.getElementById("service");
      x.selected = true;
    }
  }, [actual, input]);
  return (
    <div>
      <div className="preform">
      <div className="titlef">
          <h2>Crear Solicitud</h2>
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

export default React.memo(RequestR);