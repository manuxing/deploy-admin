import React, {useContext} from 'react'
import { actuallContext } from '../ActualContext';

const Form = ()=>{

    const func = useContext(actuallContext);
    const {
        input,
        warning,
        validate,
        services,
        servicesIds,
        createReviews,
        setInput,
        setWarning,
      } = func;

    let sub = () => {
        let senr = input;
        senr.thg = "pagina";
        let date =new Date();
        senr.dateP  = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
        senr.de = senr.cName;
        senr.cName = "deff";
        let x = validate.reviewForm(senr, servicesIds);
        if (x.status === false) {
          errHan(x);
        } else {
          createReviews({ senr });
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
    
      let handleSelect = (evento) => {
        let err = validate.reviewForm_field(evento, servicesIds);
        err.status === true ? notErrHan(evento) : errHan(err);
      };
    
      let handleChange = (evento) => {
        let val = validate.reviewForm_field(evento, servicesIds);
        val.status === true ? notErrHan(evento) : errHan(val, evento);
      };
      
      let handleSubmit = (e, inp) => {
        e.preventDefault();
        let x = validate.reviewForm(inp, servicesIds);
        x.status === false ? errHan(x) : sub();
      };

  return (
    <div>
            <div className='rf'>
                <h3>Deja tu Reseña:</h3>
            </div>
        <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
        <div className='row'>
          <div className='field'>
            <h4>Fecha de la actividad</h4>
            <input
              className="input"
              type={"date"}
              placeholder="date"
              name={"dateR"}
              value={input.dateR}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.dateP}</div>
            </div>
            <div className='field'>
              <h4>Su Nombre</h4>
                <input 
                  className="input"
                  type={"text"}
                  placeholder="Nombre"
                  name={"cName"}
                  value={input.cName}
                  onChange={(p) => handleChange(p)}
                />
              <div className="warning">{warning.cName}</div>
            </div>
          </div>
          <div className='row'>
          <div className='field'>
            <h3>Descripcion</h3>
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
          <div className='field'>
            <h3>Servicios</h3>
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
          </div>
          <div className="warning">{warning.general}</div>
          <div className='enviar'>
            <button className="input" type={"submit"} name={"submit"}>Enviar</button>
        </div>
        </form>
    </div>
  )
}

export default React.memo(Form);