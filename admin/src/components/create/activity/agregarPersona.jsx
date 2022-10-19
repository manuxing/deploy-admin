import React, { useState } from "react";
import tools from "../../../tools";


const AgregarPersona = ({ageR, setPersons, _persons}) => {
    
    let[person, setPerson] = useState({ageR:"", sexo:""});
    let[warning, setWarning] = useState({ageR:"", sexo:"", general:""});
    let validate = tools.validate;
    let sexos = ["Femenino", "Masculino", "otro"]

    let errHan = (err) =>{
        let id = err.ubic === "ageR" ? "def1" : "def2"
        setPerson({...person, [err.ubic]:""})
        err.err.map(p =>setWarning({...warning, [p.ubic]:p.message}));
        let x = document.getElementById(id);
        x.selected = true
    }

    let notErrHan = (evento) =>{
        setPerson({...person, [evento.target.name]:evento.target.value})
        setWarning({...warning, [evento.target.name]:""});
    }

    let handleSelect = (evento) => {
        let err = validate.agregarPersona_field(evento);
        err.status === true ? notErrHan(evento) : errHan(err)
    };
    
    let sub = ()=>{
        setPerson({ageR:"", sexo:""})
        setPersons({cant: _persons.cant++, cont:[..._persons.cont, person]});
        setWarning({ageR:"", sexo:"", general:""});
        let x = document.getElementById("def1");
        let x1 = document.getElementById("def2");
        x.selected = true;
        x1.selected = true;
    }

    let handleSubmit = (p) => {
        p.preventDefault();
        let val = validate.agregarPersona(person, validate.agregarPersona_field);
        val.status === false ? setWarning({...warning, general: "Advertencia, revise los campos"}) : sub()
    };

    return (
        <div className="addperson">
                 <div className="addpersonR_form">
                        <label>Grupo de edad</label>
                        <select className="selectageR" name = {'ageR'} onChange={e => {handleSelect(e)}}>
                            <option id="def1" hidden >seleccione</option>
                                {ageR.map(p => {
                                    return (
                                        <option  value={p} key={p}>{p}</option>
                                        )
                                    })}
                        </select>
                        <div className="warning">
                            {
                                warning.ageR  
                            }
                        </div>
                        <label>Sexo</label>
                        <select className="selectsexo" name = {'sexo'} onChange={e => {handleSelect(e)}}>
                            <option id="def2" hidden >sexo</option>
                                {sexos.map(p => {
                                    return (
                                        <option  value={p} key={p}>{p}</option>
                                        )
                                    })}
                        </select>
                        <div className="warning">
                            {
                                warning.sexo  
                            }
                        </div>
                        <button onClick={(p)=>handleSubmit(p)}/>
                    </div>
                    <div className="warning">
                            {
                                warning.general  
                            }
                        </div>
        </div>
    );
};

export default AgregarPersona;