import React, {useContext} from 'react'
import AgregarContacto from "../client/agregarContacto";
import { actuallContext } from '../ActualContext';
import ContactCard from "../client/contactCard";

const Form = ()=>{
    const func = useContext(actuallContext);
    const {
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
      } = func;

    let sub = () => {
        let senr = input;
        senr.thg = input.contact[0].type;
        let x = validate.requestForm(senr, servicesIds);
        if (x.status === false) {
          errHan(x);
        } else {
          dispatch(createSolicitud({ senr }));
        }
    };
    
    let errHan = (err, evento) => {
        if (evento) {
          setInput({ ...input, [evento.target.name]: evento.target.value });
        }
        let id = err.ubic === "service" ? "service" : "";
        if (id === "service") {
          let x = document.getElementById(id);
          x.selected = true;
          setInput({ ...input, sId: "" });
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
        let val = validate.requestForm_field(evento, servicesIds);
        val.status === true ? notErrHan(evento) : errHan(val, evento);
    };
      
    let handleSubmit = (e, inp) => {
        e.preventDefault();
        let x = validate.requestForm(inp, servicesIds);
        x.status === false ? errHan(x) : sub();
    };

    let popC = (e) =>{
      e.preventDefault();
      setInput({...input, contact:input.contact.slice(1)});
    }

  return (
    <form  onSubmit={(e) => handleSubmit(e, input)}>
      <div className="form">
        <div className='topf'>
          <div className='node'>
            <h3>Fecha de la solicitud</h3>
            <input
              className="input"
            type={"date"}
            placeholder="date"
            name={"dateR"}
            value={input.dateR}
            onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.dateR}</div>
          </div>
          <div className='node'>
            <h3>Fecha solicitada</h3>
            <input
            className="input"
            type={"date"}
            placeholder="date"
            name={"dateP"}
            value={input.dateP}
            onChange={(p) => handleChange(p)}
          />
            <div className="warning">{warning.dateP}</div>
          </div>
        </div>
        <div className='topf'>
          <div className='node'>
          <h3>Solicitante </h3>
          <input
            className="input"
            type={"text"}
            placeholder="Solicitante"
            name={"solicitante"}
            value={input.solicitante}
            onChange={(p) => handleChange(p)}
          />
          <div className="warning">{warning.solicitante}</div>
          </div>
          <div className='node'>
            <label>Servicio</label>
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
                  <option value={parseInt(p.id)} key={p.id}>
                    {p.name}
                  </option>
                );
              })}
            </select>
            <div className="warning">{warning.sId}</div>
          </div>
        </div>
          <AgregarContacto
            contactsThg={thg}
            setContacts={setInput}
            _contacts={input}
          />
        {typeof input.contact === 'object' && input.contact.length > 0 &&
          <div className="pop">
            <button onClick={(e)=>popC(e)}>-
            </button>
            </div>}

        <div className="warning">
          {input.contact && input.contact.length > 0 ? "" : warning.contact}
        </div>
         <div id='personss'>
            <h3>Contactos</h3>
          </div>
        <div className='contacts'>
          <div>
          {input.contact &&
            typeof input.contact === "object" &&
            input.contact.map((p) => {
              return <ContactCard key={input.contact.length} contact={p} />;
            })}
            </div>
        </div>
        <div className="warning">{warning.general}</div>
        <div className='enviar'>
          <button  type={"submit"} name={"submit"}> Enviar</button>
        </div>
      </div>
    </form>
  );
}

export default React.memo(Form);