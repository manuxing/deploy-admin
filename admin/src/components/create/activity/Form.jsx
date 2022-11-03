import React, {useContext} from 'react'
import PersonCard from "./personaCard";
import AgregarPersona from "./agregarPersona";
import { actuallContext } from '../ActualContext';

const Form = ()=> {
const func = useContext(actuallContext);
const {
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
} = func;

let sub = () => {
    let senr = input;
    let x = validate.activityForm(senr, servicesIds, clientsNames);
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
      setInputA({ ...input, sId: 1000 });
    }
    let copy = warningA;
    err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
    setWarningA(copy);
  };

  let notErrHan = (evento) => {
    setInputA({ ...input, [evento.target.name]: evento.target.value });
    setWarningA({ ...warningA, [evento.target.name]: "" });
  };

  let handleChange = (evento) => {
    evento.preventDefault();
    let val = validate.activity_client_field(evento, servicesIds, clientsNames);
    val.status === true ? notErrHan(evento) : errHan(val);
  };
  
  let handleSubmit = (e, inp) => {
    e.preventDefault();
    let x = validate.activityForm(inp, servicesIds, clientsNames);
    x.status === false ? errHan(x) : sub();
  };

  return (
    <div>
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
            list="clients"
            className="input"
            type={"text"}
            placeholder="Nombre"
            name={"name"}
            value={input.name}
            onChange={(p) => handleChange(p)}
          />
          <datalist id="clients">
            {clientsNames &&
              clientsNames.map((p) => {
                return <option value={p} key={p} />;
              })}
          </datalist>
          <div className="warning">{warningA.name}</div>
        </div>
        <AgregarPersona setPersons={setInputA} _persons={input} />
        <div>
          {typeof input.persons === "object" &&
            input.persons.map((p) => {
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
              handleChange(e);
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
    </div>
  );
}

export default Form;