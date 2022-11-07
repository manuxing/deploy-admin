import React, {useContext} from 'react'
import { actuallContext } from '../../create/ActualContext'

const Form = ()=>{

    const func = useContext(actuallContext);
    const {
        input,
        warning,
        validate,
        dispatch,
        updateServicio,
        setInput,
        setWarning,
      } = func;

    let errHan = (evento, err) => {
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
    
      let handleChange = (evento) => {
        let val = validate.serviceField(evento);
        val.status === true ? notErrHan(evento) : errHan(evento, val);
      };
    
      let sub = () => {
        let send = input;
        let x = validate.serviceForm(send);
        if (x.status === false) {
          errHan(null, x);
        } else {
          dispatch(updateServicio(send));
        }
      };
    
      let handleSubmit = (p) => {
        p.preventDefault();
        sub();
      };

  return (
    <div>
           <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
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
            <label>Horarios</label>
            <input
              className="input"
              type={"time"}
              placeholder="Desde"
              name={"tR"}
              value={input.tR}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.tR}</div>
            <input
              className="input"
              type={"time"}
              placeholder="Hasta"
              name={"tR_"}
              value={input.tR_}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.tR_}</div>
          </div>
          <input className="input" type={"submit"} name={"submit"} />
          
        </form>
    </div>
  )
}

export default React.memo(Form);