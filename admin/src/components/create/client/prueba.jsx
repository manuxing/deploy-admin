import React, { useState } from "react";
import tools from "../../../tools";
import { useHistory } from "react-router-dom";
import {createClient} from "../../../redux/actions/index.js";
import { useEffect } from "react";
import AgregarContacto from "./agregarContacto.jsx";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import ContactCard from "./contactCard.jsx";
import ActivityR from "./activityR";
import { useDispatch, useSelector } from "react-redux";
// import "./Form.css";


const Form = () => {
    let validate = tools.validate;
    let dispatch = useDispatch();
    let actual = useSelector(state => state.actual);
    let[input, setInput] = useState({ name:'', contact:[], act:"no"});
    let[submited, setSubmited] = useState(false);
    let[pressed, setPressed] = useState(false);
    let[warning, setWarning] = useState({name: '', contact: '', activity:'', general:''});
    let[contactsThg] = useState(["telefono","email","presencial","pagina","booking", "otro"]);
    const history = useHistory();

    let errHan = (evento,err) =>{
        if(evento){setInput({...input, [evento.target.name]:evento.target.value})}
        err.err.map(p =>setWarning({...warning, [p.ubic]:p.message}));
    }

    let notErrHan = (evento) =>{
        setInput({...input, [evento.target.name]:evento.target.value})
        setWarning({...warning, [evento.target.name]:""});
    }

    let handleChange = (evento) => {
        let val = validate.clientForm_field(evento);
        val.status === true ? notErrHan(evento) : errHan(evento,val)
    };
    
    let sub = () => {
        let send = input;
        let x = validate.clientForm(send);
        if(x.status === false){
            errHan(null, x);
        } else {
            setSubmited(true);
            dispatch(createClient(send));
            setInput({name: '', contact:[], act:"no"}); 
            setWarning({name: '', contact: '', activity:'', general:''});
        }
    };

    let handleSubmit = (p) => {
        p.preventDefault();
        setPressed(true);
    };

    useEffect(() => {
        if(input.act !== "no"){
            sub();
        }
    }, [input]);

    useEffect(() => {
        if(submited === true){
            if(typeof actual !== "number"){
                history.push(`/client/${actual.id}`)
            }
            console.log("submited, actual no");
        }
    }, [submited, actual]);

    return (
           <div>
             <NavBar/>
             <div className="create_cli">
               <SideBar/>
            <div className="content_act">
             Cliente:
            <form className="form" onSubmit={(e) => handleSubmit(e,input)}>
                <div>
                    <label>Nombre</label>
                    <input className="input" type = {'text'} placeholder="Name" name = {'name'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warning.name}
                    </div>
                </div>
                <AgregarContacto contactsThg={contactsThg} setContacts={setInput} _contacts={input}/>               
                <div>
                    {input.contact.map(p => {
                            return (
                                <ContactCard key={p.value}contact={p}/>
                            )
                    })}
                </div>
                <div className="warning">
                        {warning.contact}
                    </div>
                    <ActivityR pressed={pressed} setPressed={setPressed} act={input} setAct={setInput}/>
                <input className="input" type = {'submit'} name = {'submit'} 
                    />
            </form>
        </div>
        </div>
        </div>
    );
};

export default Form;