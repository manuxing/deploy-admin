import React, {useContext} from 'react'
import AgregarContacto from "./agregarContacto";
import { actuallContext } from '../ActualContext';
import ContactCard from "./contactCard";

const Form = ()=>{
    const func = useContext(actuallContext);
    const {
        input,
        warning,
        validate,
        services,
        servicesIds,
        createSolicitud,
        setInput,
        setWarning,
        thg
      } = func;

    let sub = () => {
        let senr = input;
        senr.thg = "pagina";
        let date =new Date();
        senr.dateP  = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
        let x = validate.requestForm(senr, servicesIds);
        senr.sId = "rjd";
        if (x.status === false) {
          errHan(x);
        } else {
          createSolicitud({ senr });
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
    <div>
      <div className='rf'>
        <h3>Hace tu Solicitud:</h3>
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
        <div className='row'>
          <div className='field'>
            <h4>Tu Nombre </h4>
            <input
              className="input"
              type={"text"}
              placeholder="Nombre.."
              name={"solicitante"}
              value={input.solicitante}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.solicitante}</div>
          </div>
          <div className='field'>
            <h4>Fecha solicitada</h4>
            <div className='inp'>
              <input
                className="input"
                type={"date"}
                placeholder="date"
                name={"dateR"}
                value={input.dateR}
                onChange={(p) => handleChange(p)}
              />
            </div>
            <div className="warning">{warning.dateR}</div>
          </div>
        </div>
        <div className='row'>
        <div className='field'>
            <AgregarContacto
              contactsThg={thg}
              setContacts={setInput}
              _contacts={input}
            />
          <div className='card'>
            {input.contact &&
              typeof input.contact === "object" &&
              input.contact.map((p) => {
                return <ContactCard key={input.contact.length} contact={p} />;
              })}
          </div>
          <div className='restar'>
            {typeof input.contact === 'object' && input.contact.length > 0 &&
                        <button onClick={(e)=>popC(e)}>-
                        </button>}
          </div>
          </div>
          <div className="warning">
            {input.contact && input.contact.length > 0 ? "" : warning.contact}
          </div>
          <div className='field'>
            <h4>Servicio</h4>
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
          <div className="warning">{warning.general}</div>
        </div>
        <div className='enviar'>
          <button className="input" type={"submit"} name={"submit"}>Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Form);