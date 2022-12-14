import React, { useState } from "react";
import tools from "../../../tools";

const AgregarPersona = ({ setPersons, _persons }) => {
  let [person, setPerson] = useState({ ageR: "", sexo: "" });
  let [warning, setWarning] = useState({ ageR: "", sexo: "", general: "" });
  let validate = tools.validate;
  let sexos = ["Femenino", "Masculino", "otro"];
  let ageR = ["Adulto Mayor", "Adulto", "Adolecente", "niño"];

  let errHan = (err) => {
    let id = err.ubic === "ageR" ? "def1" : "def2";
    setPerson({ ...person, [err.ubic]: "" });
    err.err.map((p) => setWarning({ ...warning, [p.ubic]: p.message }));
    let x = document.getElementById(id);
    x.selected = true;
  };

  let notErrHan = (evento) => {
    setPerson({ ...person, [evento.target.name]: evento.target.value });
    setWarning({ ...warning, [evento.target.name]: "" });
  };

  let handleSelect = (evento) => {
    let err = validate.agregarPersona_field(evento);
    err.status === true ? notErrHan(evento) : errHan(err);
  };

  let sub = () => {
    setPerson({ ageR: "", sexo: "" });
    setWarning({ ageR: "", sexo: "", general: "" });
    setPersons({ ..._persons, persons: [..._persons.persons, person] });
    let x = document.getElementById("def1");
    let x1 = document.getElementById("def2");
    x.selected = true;
    x1.selected = true;
  };

  let handleSubmit = (p) => {
    p.preventDefault();
    let val = validate.agregarPersona(person, validate.agregarPersona_field);
    val.status === false
      ? setWarning({ ...warning, general: "Advertencia, revise los campos" })
      : sub();
  };

  return (
    <div className="agregarpersona">
      <h3>Agregar Personas</h3>
      <br></br>
      <div className="top">
        <div className="node_add_per">
          <h4>Sexo</h4>
          <br></br>
          <select
            className="selectsexo"
            name={"sexo"}
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option id="def2" hidden>
              sexo
            </option>
            {sexos.map((p) => {
              return (
                <option value={p} key={p}>
                  {p}
                </option>
              );
            })}
          </select>
          <div className="warning">{warning.sexo}</div>
        </div>
        <div className="nodec">
          <h4>Grupo de edad</h4>
          <select
            className="selectageR"
            name={"ageR"}
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option id="def1" hidden>
              seleccione
            </option>
            {ageR.map((p) => {
              return (
                <option value={p} key={p}>
                  {p}
                </option>
              );
            })}
          </select>
          <div className="warning">{warning.ageR}</div>
        </div>
      </div>
      <div className="warning">{warning.general}</div>
      <div className="agregar">
        <button onClick={(p) => handleSubmit(p)}>+ </button>
      </div>
    </div>
  );
};

export default React.memo(AgregarPersona);
