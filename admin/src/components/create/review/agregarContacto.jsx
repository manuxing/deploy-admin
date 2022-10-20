import React, { useState } from "react";
import tools from "../../../tools";


const AgregarContacto = ({contactsThg, setContacts, _contacts}) => {
    
    let[contact, setContact] = useState({value:""});
    let[warning, setWarning] = useState({contacto: ''});
    let validate = tools.validate;

    
    let handleSelect = (evento) => {
        console.log(evento.target.value)
        setContact({...contact, value:evento.target.value});
        setWarning({contacto:""})
    };

    let errHan = (err) =>{
        console.log(err)
        err.err.map(p =>setWarning({...warning, [p.ubic]:p.message}));
    }

    let notErrHan = (evento) =>{
        setWarning({...warning, [evento.target.name]:""});
        sub();
        let x = document.getElementById("id");
        x.selected = true
    }

    let sub = ()=>{
        setWarning({contact: ''});
        setContacts({..._contacts, thg:contact.value});
        setContact({value:""})
    }

    let handleSubmit = (p, data) => {
        p.preventDefault();
        let val = validate.agregarMedio(contact);
        val.status === false ? errHan(val) : notErrHan(p)
    };

    return (
        <div className="addcontact">
                 <div className="addcontact_form">
                        <label>Contacto</label>
                        <select className="selectcontact" name = {'contact'} onChange={e => {handleSelect(e)}}>
                            <option  hidden >medio de contacto</option>
                                {contactsThg.map(p => {
                                    return (
                                        <option  value={p} key={p}>{p}</option>
                                        )
                                    })}
                        </select>
                        <div className="warning_acs">
                            {warning.contacto}
                        </div>
                        <button onClick={(p)=>handleSubmit(p,contact)}/>
                    </div>
        </div>
    );
};

export default AgregarContacto;