import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RemoveIcon from '@mui/icons-material/Remove';
import {
  getServicio,
  createReviews,
  setActual,
  getClient,
  errorForm,
  setActualG
} from "../../../redux/actions";
import { actuallContext } from "../ActualContext";
import Form from "./Form";
import tools from "../../../tools";

const ReviewR = ({ setP }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let validate = tools.validate;

  let actual = useSelector((state) => state.actual);
  let services = useSelector((state) => state.servicios);
  let clientes = useSelector((state) => state.clientes);
  let errForm = useSelector((state) => state.errForm);
  let servicesIds = useMemo(()=>services.map(p=> p.id),[services]);
  let clientsNames = useMemo(()=>clientes.map(p=> p.name),[clientes]);
  let thg = [
    "telefono",
    "email",
    "presencial",
    "pagina",
    "booking",
    "otro",
  ];

  let [input, setInput] = useState({
    description: "",
    dateR: "",
    dateP: "",
    thg: "",
    sId: 0,
    cName: "",
  });
  let [warning, setWarning] = useState({
    description: "",
    dateR: "",
    dateP: "",
    thg: "",
    sId: "",
    cName: "",
  });

  let send = {
    input,
    warning,
    validate,
    services,
    dispatch,
    servicesIds,
    clientsNames,
    createReviews,
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
    dispatch(getClient());
  }, [dispatch]);

  useEffect(() => {
    if (actual !== 1 && input.dateR === actual.dateR) {
      tools.alert(
        "reseña",
        `/review/${actual.id}`,
        history,
        dispatch,
        setActualG, "review",
        setP,
        setActual
      );
      let x = document.getElementById("service");
      x.selected = true;
      let y = document.getElementById("s");
      y.selected = true;
      setInput({description: "", dateR: "", dateP: "",
        thg: "",   sId: 0, cName: ""});
      setWarning({description: "", dateR: "", dateP: "",
          thg: "", sId: "", cName: ""});
    }
  }, [actual]);


  return (
    <div>
      <div className="preform">
        <div className="titlef">
          <h2>Crear Reseña</h2>
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

export default React.memo(ReviewR);
