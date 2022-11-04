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
    setInput({...input, persons:input.persons.slice(1)})
  }

  return (
    <div>
        <form className="form" >
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
          <AgregarContacto
            contactsThg={contactsThg}
            setContacts={setInput}
            _contacts={input}
          />
          <div className="warning">{warning.contact}</div>
          <div>
            {typeof input.contact === 'object' && input.contact.map((p) => {
              return <ContactCard key={p.value} contact={p} />;
            })}
          </div>
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
            <AgregarPersona setPersons={setInput} _persons={input} />
          <div>
          {typeof input.persons === 'object' && input.persons.length > 0 && input.persons.map((p) => {
            return (
              <div>
                  <PersonCard
                    key={
                      input.persons.length +
                      `${Math.random() * (Math.random() * 300)}`
                    }
                    person={p}
                  />
                  <button onClick={(e)=>popP(e)}>-
                    </button>
                </div>
            )
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
              <option value={p.id} key={`${p.id}`}>
                {p.name}
              </option>
            );
          })}
        </select>
        <div className="warning">{warning.sId}</div>
        </div>
          <button onClick={(e) => handleSubmit(e, input)}/>
        </form>
    </div>
  )
}

export default React.memo(Form);