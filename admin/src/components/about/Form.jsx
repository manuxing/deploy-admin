import React, {useContext, useState} from 'react'
import { actuallContext } from '../create/ActualContext'
import AgregarContacto from "./agregarContacto"
import ContactCard from "./contactCard"

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
      dispatch(putAbout(res));
      inpt.disabled = edit;
      setEdit(!edit);
  };

  let popC = (e) =>{
    e.preventDefault();
    setInput({...input, contact:input.contact.slice(1)});
  }

  let editS = (e) =>{
    e.preventDefault();
    inpt.disabled = edit;
    setEdit(!edit);
  }

  let id= 0; 

  return (
    <div>
        <form className="form" onSubmit={(e)=>sub(e)} >
          <div>
            <label>Info</label>
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
          {edit === false ? <></>:
          <AgregarContacto
            setContacts={setInput}
            _contacts={input}
            contactsThg={thg}
          />}
          <div className="warning">{warning.contact}</div>
          {typeof input.contact === 'object' && input.contact.length > 0 &&
                    <button onClick={(e)=>popC(e)}>-
                    </button>}
          <div>
            {typeof input.contact === 'object' && input?.contact.map((p) => {
              id++
              return (
                <div key={`${id}`}>
                  <ContactCard contact={p} />
                </div>
              )
            })}
          </div>
          <input type={"submit"}/>
        </form>
        <button onClick={(e)=>editS(e)}> edit </button>
    </div>
  )
}

export default React.memo(Form);