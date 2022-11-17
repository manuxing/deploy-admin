import React, {useContext, useState} from 'react'
import { actuallContext } from '../create/ActualContext'
import "./About.css"
import AgregarContacto from "../create/client/agregarContacto"
import ContactCard from "./contactCard"
import AgregarServicio from "./agregarServicio."
import ServiceCard from "./serviceCard" 

const Form =()=> {
  let send = useContext(actuallContext);
  let  {
    input,
    warning,
    dispatch,
    putAbout,
    setInput,
    thg
  } = send;

  let [edit, setEdit] = useState(false);

  let inpt = document.getElementById("id");

  let handleChange = (evento) => {
    setInput({...input, [evento.target.name]: evento.target.value});
  };

  let sub = (e) => {
      e.preventDefault();
      let res = input;
      console.log(res)
      dispatch(putAbout(res));
      inpt.disabled = edit;
      setEdit(!edit);
  };

  let popC = (e) =>{
    e.preventDefault();
    setInput({...input, contact:input.contact.slice(1)});
  }

  let popS = (e) =>{
    e.preventDefault();
    setInput({...input, servicios:input.servicios.slice(1)});
  }

  let editS = (e) =>{
    e.preventDefault();
    inpt.disabled = edit;
    setEdit(!edit);
  }

  let id= 0; 

  return (
    <form className="form" onSubmit={(e)=>sub(e)} >
          <div className='about'>
          <div>
            <textarea
              id='id'
              className="input"
              placeholder="info"
              name={"info"}
              value={input.info}
              onChange={(p) => handleChange(p)}
              disabled
            />
          </div>
          <div>
            {edit === false ? <></>:
            <AgregarServicio
              setContacts={setInput}
              _contacts={input}
            />}
            <div className="warning">{warning.servicio}</div>
            <div className='title-'>
              <h3>Servicios</h3>
            {edit === true && typeof input.servicios === 'object' && input.servicios.length > 0 &&
                      <button onClick={(e)=>popS(e)}>-
                      </button>}
            </div>
            <div className='persons'>
              {typeof input.servicios === 'object' && input?.servicios.map((p) => {
                return (
                  <div key={`${p.name}`}>
                    <ServiceCard service={p} />
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            {edit === false ? <></>:
            <AgregarContacto
              setContacts={setInput}
              _contacts={input}
              contactsThg={thg}
            />}
            <div className="warning">{warning.contact}</div>
            <div className='title-'>
              <h3>Contactos</h3>
            {edit === true && typeof input.contact === 'object' && input.contact.length > 0 &&
                      <button onClick={(e)=>popC(e)}>-
                      </button>}
            </div>
            <div className='persons'>
              {typeof input.contact === 'object' && input?.contact.map((p) => {
                id++
                return (
                  <div key={`${id}`}>
                    <ContactCard contact={p} />
                  </div>
                )
              })}
            </div>
          </div>
            <div className='buttons'>
            <button  type={"submit"} name={"submit"}> Enviar</button>
              <button onClick={(e)=>editS(e)}> Edit </button>
            </div>
        </div>
        </form>
  )
}

export default React.memo(Form);