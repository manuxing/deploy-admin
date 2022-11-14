import React, {useContext} from 'react';
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
    let validation = validate.activityForm(senr, servicesIds, clientsNames);
    if (validation.status === false) {
      errHan(validation);
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

  let pop = () =>{
    setInputA({...input, persons:input.persons.slice(1)})
  }

  return (
    <form  onSubmit={(e) => handleSubmit(e, input)}>
        <div className="form">
        <div className='topf'>
          <div className='node'>
            <h4>Fecha de la actividad</h4>
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
          <div className='node'>
            <h3>Cliente</h3>
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
        </div>
        <div className="midf">
          <AgregarPersona setPersons={setInputA} _persons={input} />
          {typeof input.persons === "object" &&  input.persons.length > 0 &&
            <div className="pop">
                <button  onClick={()=>pop()}>-
                </button>
            </div>
          }
          <div className='node'>
            <h3>Servicios</h3>
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
        </div>
        <div className='persons'>
            {typeof input.persons === "object" &&
              input.persons.map((p) => {
                let count =Math.random() * (Math.random() * 300);
                return (
                   <PersonCard
                      key={
                        input.persons.cant +
                        `${count}`
                      }
                      person={p}
                    />
                );
              })}
          </div>
        <div className="warning">{warningA.general}</div>
        <input className="input" type={"submit"} name={"submit"} />
      </div>
      </form>
  );
}

export default React.memo(Form);