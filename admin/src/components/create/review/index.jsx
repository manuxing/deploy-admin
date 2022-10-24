import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { getServicio, createReviews } from "../../../redux/actions";
import { useEffect } from "react";
import tools from "../../../tools";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";

const ReviewR = () => {
    const history = useHistory();
    let dispatch = useDispatch();
    let validate = tools.validate;
    let actual = useSelector(state => state.actual);
    let services = useSelector(state => state.servicios);
    let[thg] = useState(["telefono","email","presencial","pagina","booking", "otro"]);
    let[input, setInputA] = useState({ description:"",dateR:"", dateP:"" , thg:"", sId:0,  cName:"" });
    let[warningA, setWarningA] = useState({ description:"",dateR:"", dateP:"" , thg:"", sId:0,  cName:"" });
    
    let sub = () => {
        let senr = input;
        senr.thg = input.thg;
        let x = validate.reviewForm(senr);
        if(x.status === false){
            errHan(x);
        } else {
            dispatch(createReviews({senr}));
        }
    };
    
    let errHan = (err, evento) =>{
        console.log("err",err);
        if(evento){
            setInputA({...input, [evento.target.name]:evento.target.value})
        }
        let id = err.ubic === "service" ? "service" : ""
        if(id === "service"){
            let x = document.getElementById(id);
            x.selected = true;
            setInputA({...input, sId:""});
        }
        err.err.map(p =>setWarningA({...warningA, [p.ubic]:p.message}));
    }
    
    let notErrHan = (evento) =>{
        console.log("evento",evento);
        setInputA({...input, [evento.target.name]:evento.target.value})
        setWarningA({...warningA, [evento.target.name]:""});
    }
    
    let handleSelect = (evento) => {
        let err = validate.reviewForm_field(evento);
        err.status === true ? notErrHan(evento) : errHan(err)
    };
    
    let handleChange = (evento) => {
        let val = validate.reviewForm_field(evento);
        val.status === true ? notErrHan(evento) : errHan(val,evento)
    };
    
    useEffect(() => {
        dispatch(getServicio());
    }, [dispatch]);
    
    useEffect(() => {
        if(actual !== 1 && input.dateR === actual.dateR){
            setInputA({ description:"",dateR:"", dateP:"" , thg:"", sId:0,  cName:"" }); 
            setWarningA({ description:"",dateR:"", dateP:"" , thg:"", sId:"",  cName:"" });
            history.push(`/review/${actual.id}`)
        }
    }, [actual]);

    let handleSubmit = (e,inp) =>{
        e.preventDefault();     
        let x = validate.reviewForm(inp);
        x.status === false ? errHan(x) : sub();
    }

    return (
        <div>
            <NavBar/>
            <div className="create_cli">
               <SideBar/>
            <div className="content_act">
             Reseña:
            <form className="form" onSubmit={(e) => handleSubmit(e,input)}>
                <div>
                    <label>Fecha de la reseña</label>
                    <input className="input" type = {'date'} placeholder="date" name = {'dateR'} value = {input.dateR}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.dateR}
                    </div>
                </div>
                <div>
                    <label>Fecha de la actividad</label>
                    <input className="input" type = {'date'} placeholder="date" name = {'dateP'} value = {input.dateP}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.dateP}
                    </div>
                </div>
                <div>
                    <label>Cliente</label>
                    <input className="input" type = {'text'} placeholder="Nombre" name = {'cName'} value = {input.cName}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.cName}
                    </div>
                </div>
                <div>
                    <label>description</label>
                    <input className="input" type = {'text'} placeholder="descripcion" name = {'description'} value = {input.description}
                    onChange = {(p => handleChange(p))}/>
                    <div className="warning">
                        {warningA.description}
                    </div>
                </div>
                <div>
                    <select className="selectcontact" name = {'thg'} onChange={e => {handleSelect(e)}}>
                            <option  hidden >medio de contacto</option>
                                {thg.map(p => {
                                    return (
                                        <option  value={p} key={p}>{p}</option>
                                        )
                                })}
                    </select>
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

export default ReviewR;