import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServicio,
  createActividades,
  getActividades,
  setActual,
} from "../../../redux/actions";
import tools from "../../../tools";
import PersonCard from "./personaCard";
import AgregarPersona from "./agregarPersona";
//hacer datadisplay para los nombres 
//validar con los nombres del estado
// validar con los servicios del estado

const ActivityR = ({ setP }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let validate = tools.validate;
  let actual = useSelector((state) => state.actual);
  let services = useSelector((state) => state.servicios);
  let ageR = ["Adulto Mayor", "Adulto", "Adolecente", "niño"];
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

  let sub = () => {
    let senr = input;
    let x = validate.activityForm(senr);
    if (x.status === false) {
      errHan(x);
    } else {
      dispatch(createActividades(senr));
    }
  };

  let errHan = (err) => {
    let id = err.ubic === "service" ? "service" : "";
    if (id === "service") {
      let x = document.getElementById(id);
      x.selected = true;
      setInputA({ ...input, sId: "" });
    }
    let copy = warningA;
    err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
    setWarningA(copy);
  };

  let notErrHan = (evento) => {
    setInputA({ ...input, [evento.target.name]: evento.target.value });
    setWarningA({ ...warningA, [evento.target.name]: "" });
  };

  let handleSelect = (evento) => {
    let err = validate.activity_client_field(evento);
    err.status === true ? notErrHan(evento) : errHan(err);
  };

  let handleChange = (evento) => {
    let val = validate.activity_client_field(evento);
    val.status === true ? notErrHan(evento) : errHan(val);
  };

  useEffect(() => {
    dispatch(getServicio());
  }, [dispatch]);

  useEffect(() => {
    if (actual !== 1 && input.date === actual.date) {
      tools.alert(
        "actividad",
        `/activity/${actual.id}`,
        history,
        dispatch,
        getActividades,
        setP,
        setActual
      );
      setInputA({ name: "", date: "", persons: [], sId: 1000 });
      setWarningA({ name: "", date: "", persons: "", sId: "" });
      let x = document.getElementById("service");
      x.selected = true;
    }
  }, [actual, input]);

  let handleSubmit = (e, inp) => {
    e.preventDefault();
    let x = validate.activityForm(inp);
    x.status === false ? errHan(x) : sub();
  };

  return (
    <div>
      <div className="content_act">
        Actividad:
        <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
          <div>
            <label>Fecha de la actividad</label>
            <input
              className="input"
              type={"date"}
              placeholder="date"
              name={"date"}
              value={input.date}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warningA.date}</div>
          </div>
          <div>
            <label>Cliente</label>
            <input
              className="input"
              type={"text"}
              placeholder="Nombre"
              name={"name"}
              value={input.name}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warningA.name}</div>
          </div>
          <AgregarPersona ageR={ageR} setPersons={setInputA} _persons={input} />
          <div>
            {input.persons.map((p) => {
              return (
                <PersonCard
                  key={
                    input.persons.cant +
                    `${Math.random() * (Math.random() * 300)}`
                  }
                  person={p}
                />
              );
            })}
          </div>
          <div>
            <label>Servicios</label>
            <select
              className="selectageR"
              name={"sId"}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <option id="service" hidden>
                seleccione
              </option>
              {services.map((p) => {
                return (
                  <option key={`${p.id}`} value={p.id}>
                    {p.name}
                  </option>
                );
              })}
            </select>
            <div className="warning">{warningA.sId}</div>
          </div>
          <div className="warning">{warningA.general}</div>
          <input className="input" type={"submit"} name={"submit"} />
        </form>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default ActivityR;