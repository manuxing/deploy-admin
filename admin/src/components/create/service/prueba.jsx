import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicio,
  setActual,
  getServicio,
  errorForm
} from "../../../redux/actions/index.js";
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
  let [submited, setSubmited] = useState(false);

  let errHan = (evento, err) => {
    if (evento) {
      setInput({ ...input, [evento.target.name]: evento.target.value });
    }
    let copy = warning;
    err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
    setWarning(copy);
  };

  let notErrHan = (evento) => {
    setInput({ ...input, [evento.target.name]: evento.target.value });
    setWarning({ ...warning, [evento.target.name]: "" });
  };

  let handleChange = (evento) => {
    let val = validate.serviceField(evento);
    val.status === true ? notErrHan(evento) : errHan(evento, val);
  };

  let sub = () => {
    let send = input;
    let x = validate.serviceForm(send);
    if (x.status === false) {
      errHan(null, x);
    } else {
      setSubmited(true);
      dispatch(createServicio(send));
    }
  };

  let handleSubmit = (p) => {
    p.preventDefault();
    sub();
  };

  useEffect(() => {
    if(errForm && errForm?.data){
      alert(errForm.data)
      dispatch(errorForm());
    }
  }, [errForm]);

  useEffect(() => {
    if (submited === true) {
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
    }
  }, [submited, actual]);

  return (
    <div>
      <div className="content_act">
        Servicio:
        <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
          <div>
            <label>Nombre</label>
            <input
              className="input"
              type={"text"}
              placeholder="Name"
              name={"name"}
              value={input.name}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.name}</div>
          </div>
          <div>
            <label>Descripcion</label>
            <textarea
              className="input"
              type={"text"}
              placeholder="Descripcion"
              name={"description"}
              value={input.description}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.description}</div>
          </div>
          <div>
            <label>Horarios</label>
            <input
              className="input"
              type={"time"}
              placeholder="Desde"
              name={"tR"}
              value={input.tR}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.tR}</div>
            <input
              className="input"
              type={"time"}
              placeholder="Hasta"
              name={"tR_"}
              value={input.tR_}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.tR_}</div>
          </div>
          <input className="input" type={"submit"} name={"submit"} />
        </form>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default AgregarServicio;
