import React, { useState } from "react";
import tools from "../../../tools";


const AgregarContacto = ({contactsThg, setContacts, _contacts}) => {
    
    let[contact, setContact] = useState({type:"", value:""});
    let[warning, setWarning] = useState({contacto: ''});
    let[trigger, setTrigger] = useState(false);
    let validate = tools.validate;

    
    let handleSelect = (evento) => {
        console.log(evento.target.name)
        setContact({...contact, type:evento.target.value});
        if(evento.target.value === "presencial" ||evento.target.value === "pagina" ||evento.target.value === "booking"){
            setContact({...contact, value:evento.target.value});
        }
        setWarning({contacto:""})
        console.log(contact)
    };


    let chooseType = (t) =>{
        if (t === "telefono")return "number";
        if (t === "presencial"||t === "otro")return "text"
        if (t === "email")return "email";
    };
    
    let handleChange = (p,data) => {
        p.preventDefault();
        setContact({...contact, value:p.target.value})
    };

    let errHan = (err) =>{
        console.log(err)
        err.err.map(p =>setWarning({...warning, [p.ubic]:p.message}));
    }

    let notErrHan = (evento) =>{
        setWarning({...warning, [evento.target.name]:""});
        sub();
    }

    let sub = ()=>{
        setWarning({contact: ''});
        setContacts({cant: _contacts.cant++, cont:[..._contacts.cont, contact]});
        setContact({type:"", value:""});
        setTrigger(true);
    }

    let handleSubmit = (p, data) => {
        p.preventDefault();
        console.log(data)
        let val = validate.agregarContacto(data);
        val.status === false ? errHan(val) : notErrHan(p)
    };

    return ( trigger === true ? <></> :
        <div className="addcontact">
                 <div className="addcontact_form">
                        <label>Contacto</label>
                        <select className="selectcontact" name = {'contact'} onChange={(e) => handleSelect(e)}>
                            <option  hidden >medio de contacto</option>
                                {contactsThg.map(p => {
                                    return (
                                        <option  value={p} key={p}>{p}</option>
                                        )
                                    })}
                        </select>
                        {contact.type === "pagina" || contact.type === "booking" || contact.type === "" || contact.type === "presencial" ? 
                            <></> : <input className="inputcontact" type = {chooseType(contact.type)} name = {'value'} value = {contact.value}
                            onChange = {(p => {handleChange(p)})}/>}
                        <div className="warning_acs">
                            {warning.contacto}
                        </div>
                        <button onClick={(p)=>handleSubmit(p,contact)}/>
                    </div>
        </div>
    );
};

export default AgregarContacto;