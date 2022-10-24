import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import tools from "../../../../tools";
import AgregarPersona from "./agregarPersona";
import { getServicio } from "../../../../redux/actions";
import { useEffect } from "react";
import PersonCard from "./personaCard";

const ActivityR = ({pressed, setPressed, act, setAct}) => {
    
    let dispatch = useDispatch();
    let validate = tools.validate;
    let services = useSelector(state => state.servicios);
    let ageR = ["Adulto Mayor", "Adulto", "Adolecente", "niño"];
    let[input, setInputA] = useState({date: '', persons:[], sId:1000});
    let[warningA, setWarningA] = useState({date: '', persons:'', sId:'', general:''});
    
    let sub = () => {
        let senr = input;
        let x = validate.activity_clientForm(senr);
        if(x.status === false){
            setWarningA({...warningA, general:'todos los campos son obligatorios, completelos'});
        } else {
            setAct({...act, act:senr});
            setInputA({date: '', persons:[], sId:1000}); 
            setWarningA({date: '', persons:'', sId:''});
        }
    };
    
    let errHan = (err) =>{
        let id = err.ubic === "service" ? "service" : ""
        if(id === "service"){
            let x = document.getElementById(id);
            x.selected = true;
            setInputA({...input, sId:""});
        }
        err.err.map(p =>setWarningA({...warningA, [p.ubic]:p.message}));
    }
    
    let notErrHan = (evento) =>{
        setInputA({...input, [evento.target.name]:evento.target.value})
        setWarningA({...warningA, [evento.target.name]:""});
    }

    let handleSelect = (evento) => {
        let err = validate.activity_client_field(evento);
        err.status === true ? notErrHan(evento) : errHan(err)
    };
    
    let handleChange = (evento) => {
        let val = validate.activity_client_field(evento);
        val.status === true ? notErrHan(evento) : errHan(val)
    };

    useEffect(() => {
        dispatch(getServicio());
    }, [dispatch]);
    
    useEffect(() => {
        if(pressed === true){
            console.log("pressed true")
            sub();
            setPressed(false);
        }
    }, [pressed]);

    return (
        <div>
                <div>
                    <label>Fecha de la actividad</label>
                    <input className="input" type = {'date'} placeholder="date" name = {'date'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.date}
                    </div>
                </div>
                <AgregarPersona ageR={ageR} setPersons={setInputA} _persons={input}/>               
                <div>
                    {input.persons.map(p => {
                            return (
                                <PersonCard key={input.persons.length}person={p}/>
                            )
                    })}
                </div>
                <div>
                    <label>Servicios</label>
                    <select className="selectageR" name = {'sId'} onChange={e => {handleSelect(e)}}>
                            <option id="service" hidden >seleccione</option>
                                {services.map(p => {
                                    return (
                                        <option value={p.id} key={p.id}>{p.name}</option>
                                        )
                                    })
                                }
                    </select>
                    <div className="warning">
                        {warningA.sId}
                    </div>
                </div>
                <div className="warning">
                        {warningA.general}
                    </div>
        </div>
    );
};

export default ActivityR;