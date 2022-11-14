import React, {useContext} from 'react'
import { actuallContext } from '../ActualContext'; 
import AgregarContacto from "./agregarContacto.jsx";
import ContactCard from "./contactCard.jsx";
import AgregarPersona from "../activity/agregarPersona.jsx";
import PersonCard from "../activity/personaCard";

const Form =()=> {

const func = useContext(actuallContext);
const {
    input,
    warning,
    validate,
    services,
    dispatch,
    servicesIds,
    createClient,
    setInput,
    setWarning,
    contactsThg
  } = func

  let handleChange = (evento) => {
    let val = validate.clientForm_field(evento, servicesIds);
    val.status === true ? notErrHan(evento) : errHan(evento, val);
  };
  
  let errHan = (evento, err) => {
    let id = err.ubic === "service" ? "service" : "";
    if (id === "service") {
      let x = document.getElementById(id);
      x.selected = true;
      setInput({ ...input, sId: "" });
    }
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

  let sub = () => {
    let res = {
      name: input.name,
      contact: input.contact,
      act: {
        date: input.date,
        persons: input.persons,
        sId: input.sId,
      }
    };
    let x = validate.clientForm(res, servicesIds);
    if (x.status === false) {
      errHan(null, x);
    } else {
      dispatch(createClient(res));
    }
  };

  let handleSubmit = (p, input) => {
    p.preventDefault();
    let res = {
      name: input.name,
      contact: input.contact,
      act: {
        date: input.date,
        persons: input.persons,
        sId: input.sId,
      }
    };
    let x = validate.clientForm(res, servicesIds);
    x.status === false ? errHan(null, x) : sub();
  };
  
  let popP = (e) =>{
    e.preventDefault();
    setInput({...input, persons:input.persons.slice(1)});
  }

  let popC = (e) =>{
    e.preventDefault();
    setInput({...input, contact:input.contact.slice(1)});
  }

  return (
    <form >
      <div className="form">
        <div className='topf'>
          <div className='node'>
            <h3>Nombre</h3>
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
            <AgregarContacto
              contactsThg={contactsThg}
              setContacts={setInput}
              _contacts={input}
            />
            {typeof input.contact === "object" && input.contact.length > 0 && (
              <div className='pop'>
                <button onClick={(e) => popC(e)}>-</button>
              </div>
            )}
          <div className="warning">{warning.contact}</div>
        </div>
          <div id='personss'>
            <h3>Contactos</h3>
          </div>
          <div className='contacts'>
          <div>
            {typeof input.contact === "object" &&
              input.contact.map((p) => {
                return (
                  <div key={p.value}>
                    <ContactCard contact={p} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className='topf'>
          <div className='node'>
            <h3>Fecha de la actividad</h3>
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
                  <option value={p.id} key={`${p.id}`}>
                    {p.name}
                  </option>
                );
              })}
            </select>
            <div className="warning">{warning.sId}</div>
          </div>
        </div>
          <AgregarPersona setPersons={setInput} _persons={input} />
          {typeof input.persons === "object" && input.persons.length > 0 && (
            <button onClick={(e) => popP(e)}>-</button>
          )}
           <div id='personss'>
          <h3>Personas</h3>
        </div>
        <div className='persons'>
            {typeof input.persons === "object" &&
              input.persons.length > 0 &&
              input.persons.map((p) => {
              return (
                <div>
                  <PersonCard
                    key={
                      input.persons.length +
                      `${Math.random() * (Math.random() * 300)}`
                    }
                    person={p}
                  />
                </div>
              );
            })}
        </div>
        <div className='enviar'>
          <button onClick={(e) => handleSubmit(e, input)}> Enviar</button>
        </div>
      </div>
    </form>
  );
}

export default React.memo(Form);