import React, { useState } from "react";
import tools from "../../../tools";
import { useHistory } from "react-router-dom";
import {createServicio} from "../../../redux/actions/index.js";
import { useEffect } from "react";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import { useDispatch, useSelector } from "react-redux";
// import "./Form.css";


const AgregarServicio = () => {
    let validate = tools.validate;
    let dispatch = useDispatch();
    let actual = useSelector(state => state.actual);
    let[input, setInput] = useState({ name:'', description:"", tR:""});
    let[submited, setSubmited] = useState(false);
    let[warning, setWarning] = useState({ name:'', description:"", tR:""});
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
        let val = validate.serviceField(evento);
        val.status === true ? notErrHan(evento) : errHan(evento,val)
    };
    
    let sub = () => {
        let send = input;
        let x = validate.serviceForm(send);
        if(x.status === false){
            errHan(null, x);
        } else {
            setSubmited(true);
            dispatch(createServicio(send));
            setInput({ name:'', description:"", tR:""}); 
            setWarning({ name:'', description:"", tR:""});
        }
    };

    let handleSubmit = (p) => {
        p.preventDefault();
        sub();
    };


    useEffect(() => {
        if(submited === true){
            if(typeof actual !== "number"){
                history.push(`/service/${actual.id}`)
            }
            console.log("submited, actual no", actual);
        }
    }, [submited, actual]);

    return (
           <div>
             <NavBar/>
             <div className="create_cli">
               <SideBar/>
            <div className="content_act">
             Servicio:
            <form className="form" onSubmit={(e) => handleSubmit(e,input)}>
                <div>
                    <label>Nombre</label>
                    <input className="input" type = {'text'} placeholder="Name" name = {'name'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warning.name}
                    </div>
                </div>
                <div>
                    <label>Descripcion</label>
                    <input className="input" type = {'text'} placeholder="Descripcion" name = {'description'} value = {input.description}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warning.description}
                    </div>
                </div>
                <div>
                    <label>Horarios</label>
                    <input className="input" type = {'text'} placeholder="Desde - Hasta" name = {'tR'} value = {input.tR}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warning.tR}
                    </div>
                </div>
                <input className="input" type = {'submit'} name = {'submit'} 
                    />
            </form>
        </div>
        </div>
        </div>
    );
};

export default AgregarServicio;