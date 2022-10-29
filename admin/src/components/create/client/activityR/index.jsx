import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tools from "../../../../tools";
import SubForm from "../../../../mod/subForm";
import { getServicio } from "../../../../redux/actions";
import PersonCard from "./personaCard";
import herenciaAddPersona from "./herencaAddPerson";

const ActivityR = ({ pressed, setPressed, act, setAct }) => {
  let dispatch = useDispatch();
  let validate = tools.validate;
  let services = useSelector((state) => state.servicios);
  let [input, setInput] = useState({ date: "", persons: [], sId: 1000 });
  let [warning, setWarning] = useState({
    date: "",
    persons: "",
    sId: "",
    general: "",
  });

  let herenciaAddP = herenciaAddPersona(setInput, input, document);

  let sub = () => {
    let senr = input;
    let x = validate.activity_clientForm(senr);
    if (x.status === false) {
      setWarning({
        ...warning,
        general: "todos los campos son obligatorios, completelos",
      });
    } else {
      setAct({ ...act, act: senr });
      setInput({ date: "", persons: [], sId: 1000 });
      setWarning({ date: "", persons: "", sId: "", general:""});
      let x = document.getElementById("service");
      x.selected = true;
    }
  };

  let errHan = (err) => {
    let id = err.ubic === "service" ? "service" : "";
    if (id === "service") {
      let x = document.getElementById(id);
      x.selected = true;
      setInput({ ...input, sId: "" });
    }
    err.err.map((p) => setWarning({ ...warning, [p.ubic]: p.message }));
  };

  let notErrHan = (evento) => {
    setInput({ ...input, [evento.target.name]: evento.target.value });
    setWarning({ ...warning, [evento.target.name]: "" });
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
    if (pressed === true) {
      sub();
      setPressed(false);
    }
  }, [pressed, input]);

  return (
    <div>
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
        <div className="warning">{warning.date}</div>
      </div>
      <SubForm herencia={herenciaAddP} />
      <div>
        {input.persons.map((p) => {
          return <PersonCard key={input.persons.length} person={p} />;
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
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            );
          })}
        </select>
        <div className="warning">{warning.sId}</div>
      </div>
      <div className="warning">{warning.general}</div>
    </div>
  );
};

export default ActivityR;
