import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { getServicio, createActividades } from "../../../redux/actions";
import { useEffect } from "react";
import tools from "../../../tools";
import PersonCard from "./personaCard";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import AgregarPersona from "./agregarPersona";

const ActivityR = () => {
    const history = useHistory();
    let dispatch = useDispatch();
    let validate = tools.validate;
    let actual = useSelector(state => state.actual);
    let services = useSelector(state => state.servicios);
    let ageR = ["Adulto Mayor", "Adulto", "Adolecente", "niño"];
    let[input, setInputA] = useState({name:'', date: '', persons:[], sId:1000});
    let[warningA, setWarningA] = useState({name:'', date: '', persons:'', sId:'', general:''});
    
    let sub = () => {
        let senr = input;
        let x = validate.activity_clientForm(senr);
        if(x.status === false){
            console.log(x);
            errHan(x);
        } else {
            console.log("antes de enviar",senr);
            dispatch(createActividades(senr));
        }
    };
    
    let errHan = (err) =>{
        console.log(err);
        let id = err.ubic === "service" ? "service" : ""
        if(id === "service"){
            let x = document.getElementById(id);
            x.selected = true;
            setInputA({...input, sId:""});
        }
        err.err.map(p =>setWarningA({...warningA, [p.ubic]:p.message}));
    }
    
    let notErrHan = (evento) =>{
        console.log(evento);
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
        console.log(input.persons)
        if(actual !== 1 && input.date === actual.date){
            history.push(`/activity/${actual.id}`)
            console.log("submited act");
            setInputA({date: '', persons:[], sId:1000}); 
            setWarningA({date: '', persons:'', sId:''});
        }
    }, [actual, input]);


    let handleSubmit = (e,inp) =>{
        e.preventDefault();     
        let x = validate.activity_clientForm(inp);
        x.status === false ? errHan(x) : sub();
    }

    return (
        <div>
            <NavBar/>
            <div className="create_cli">
               <SideBar/>
            <div className="content_act">
             Actividad:
            <form className="form" onSubmit={(e) => handleSubmit(e,input)}>
                <div>
                    <label>Fecha de la actividad</label>
                    <input className="input" type = {'date'} placeholder="date" name = {'date'} value = {input.dame}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.date}
                    </div>
                </div>
                <div>
                    <label>Cliente</label>
                    <input className="input" type = {'text'} placeholder="Nombre" name = {'name'} value = {input.name}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.name}
                    </div>
                </div>
                <AgregarPersona ageR={ageR} setPersons={setInputA} _persons={input}/>               
                <div>
                    {input.persons.map(p => {
                            return (
                                <PersonCard key={input.persons.cant + `${Math.random() * (Math.random() * 300)}`}person={p}/>
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
                    <input className="input" type = {'submit'} name = {'submit'} 
                    />
                    </form>
        </div>
        </div>
        </div>
    );
};

export default ActivityR;