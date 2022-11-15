import React, {useContext} from 'react'
import { actuallContext } from '../ActualContext';

const Form = ()=>{

    const func = useContext(actuallContext);
    const {
        input,
        warning,
        validate,
        services,
        dispatch,
        servicesIds,
        clientsNames,
        createReviews,
        setInput,
        setWarning,
        thg
      } = func;

    let sub = () => {
        let senr = input;
        senr.thg = input.thg;
        let x = validate.reviewForm(senr, servicesIds,clientsNames);
        if (x.status === false) {
          errHan(x);
        } else {
          dispatch(createReviews({ senr }));
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
        let x = validate.reviewForm(inp, servicesIds, clientsNames);
        x.status === false ? errHan(x) : sub();
      };

  return (
    <div>
        <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
          <div>
            <label>Fecha de la reseña</label>
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
          <div>
            <label>Fecha de la actividad</label>
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
          <div>
          <label>Cliente</label>
              <input list="clients"
                className="input"
                type={"text"}
                placeholder="Nombre"
                name={"cName"}
                value={input.cName}
                onChange={(p) => handleChange(p)}
              />
                <datalist id="clients">
                  {
                    clientsNames && clientsNames.map(p=>{
                      return(
                        <option key={p}value={p}/>
                      )
                    })
                  }
                </datalist>
            <div className="warning">{warning.cName}</div>
          </div>
          <div>
            <label>Descripcion</label>
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
          <div>
            <select
              className="selectcontact"
              name={"thg"}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <option id="s" hidden>
                medio de contacto
              </option>
              {thg.map((p) => {
                return (
                  <option value={p} key={p}>
                    {p}
                  </option>
                );
              })}
            </select>
            <div className="warning">{warning.thg}</div>
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
          <input className="input" type={"submit"} name={"submit"} />
        </form>
    </div>
  )
}

export default React.memo(Form);