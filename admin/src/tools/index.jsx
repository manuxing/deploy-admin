const tools = {
    display :{
        activity : {
            dash : (dis) =>{
                return(
                        dis.contact ? 
                        <div>
                            <p>{dis.name}</p>
                            {dis.contact.map(p =>{
                                return(
                                    <p key={p}>{p}</p>    
                                )
                            })}
                        </div> :
                        <div>
                            <p>{dis.name}</p>
                        </div>    
                    ) 
            },
        },
        review :{
            dash : (dis) =>{
                return(
                        <div>
                            <p>{dis}</p>
                        </div> 
                    ) 
            },
        }

    },
    validate :{
        agregarContacto: (con) => {
            let res = {status: true};
            let errs = [];
            switch (con.type) {
                case "telefono":{
                    let reg = new RegExp(/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/);
                    if(reg.test(con.value) === false||con.value.length > 13){
                        let err = {
                            message:"telefono invalido",
                            ubic:"contacto"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                }
                break
                case "email":{
                    let reg = new RegExp(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/);
                    if(reg.test(con.value) === false){
                        let err = {
                            message:"email invalido",
                            ubic:"contacto"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                }
                break
                default:{
                    console.log(con)
                    let values = ["presencial","booking","pagina"]
                    if(values.includes(con.value) === false){
                        let err = {
                            message:"contacto invalido",
                            ubic:"contacto"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                }
              }
            res.err = errs;
            return res;
        },
        agregarPersona_field: (field) => {
            let res = {status: true, ubic:field.target.name};
            let errs = [];
            let sexos = ["Femenino", "Masculino", "otro"];
            let ageR = ["Adulto Mayor", "Adulto", "Adolecente", "niño"];
            switch (field.target.name) {
                case "ageR":
                    if(ageR.includes(field.target.value) === false){
                        let err = {
                            message:"rango de edad invalido",
                            ubic: "ageR"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                break
                case "sexo":
                    if(sexos.includes(field.target.value) === false){
                        let err = {
                            message:"sexo invalido",
                            ubic:"sexo"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                
                break
                default:{
                }
              }
            res.err = errs;
            return res;
        },
        agregarPersona: (persona,cb) => {
            let res = {status: true};
            let resX = [];
            let obj = {
                target : {
                    name: "ageR",
                    value: persona.ageR
                },
            }
            let checkA = cb(obj);
            resX.push(checkA);
            obj.target.name = "sexo";
            obj.target.value = persona.sexo;
            let checkS = cb(obj);
            resX.push(checkS);
            res.res = resX;
            res.errs = resX.map(p => {
                if(p.status === false)res.status = false
                return p.err
            });
            return res;
        },
        activity_client_field: (p) => {
            let errs = [];
            let res = {status: true, ubic:p.target.name}
            let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
            switch (p.target.name) {
                case "date":
                    let x = p.target.value.split("-").reverse().join("-");
                    if(dateR.test(x) === false|| parseInt(x.split("-")[x.split("-").length-1]) < 2000){
                        let err = {
                            message: "ingrese una fecha valida",
                            ubic: "date"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                break
                case "sId":
                    if(Number(p.target.value) !== parseInt(p.target.value) || parseInt(p.target.value) > 6){
                        console.log(Number(p.target.value), p.target.value);
                        let err = {
                            message: "ingrese un servicio correcto",
                            ubic: "sId"
                        }
                        errs.push(err);
                        res.status = false;
                    }
                break
                default:{
                }
            }
            res.err = errs;
            return res;
        },
        activity_clientForm: (act) => {
            let errs = [];
            let res = {status: true, ubic:"activityForm"}
            let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
            let x = act.date.split("-").reverse().join("-");
                    if(dateR.test(x) === false|| parseInt(x.split("-")[x.split("-").length-1]) < 2000){
                        let err = {
                            message: "ingrese una fecha valida",
                            ubic: "date"
                        }
                        errs.push(err);
                        res.status = false;
                    }
            if(typeof act.persons !== "object"){
                let err = {
                    message: "revise el campo personas, no deberia cambiar de array",
                    ubic: "persons"
                }
                errs.push(err);
                res.status = false;
            }
            if(Number(act.sId) !== parseInt(act.sId) || parseInt(act.sId) > 6){
                let err = {
                    message: "ingrese un servicio correcto",
                    ubic: "sId"
                }
                errs.push(err);
                res.status = false;
                res.ubic = "service"
            }
            res.err = errs;
            return res;
        },
        clientForm_field: (evento) => {
            let errs = [];
            let res = {status: true, ubic: evento.target.name}
            let nameR = new RegExp(/[a-zA-Z ]$/);
            switch (evento.target.name) {
                case "name":
                    if(nameR.test(evento.target.value) === false){
                        let err = {
                            message: "ingrese un nombre valido",
                            ubic: "name"
                        }
                        res.status = false;
                        errs.push(err);
                    }
                break
                case "sId":
                    if(typeof evento.target.value !== "object"){
                        let err = {
                            message: "revise los contactos, no deberia cambiar de array",
                            ubic: "contacts"
                        }
                        res.status = false;
                        errs.push(err);
                    }
                break
                default:{
                }
            }
            res.err = errs;
            return res;
        },
        clientForm: (client) => {
            let errs = [];
            let res = {status: true}
            let nameR = new RegExp(/[a-zA-Z ]$/);
            if(nameR.test(client.name) === false){
                let err = {
                    message: "ingrese un nombre valido",
                    ubic: "client_name"
                }
                res.status = false;
                errs.push(err);
            }
            if(typeof client.contact !== "object"||client.contact.length < 1){
                let err = {
                    message: "revise los contactos, no deberia cambiar de array",
                    ubic: "client_contacts"
                }
                res.status = false;
                errs.push(err);
            }
            res.err = errs;
            return res;
        },
        reviewForm_field: (evento) => {
            let errs = [];
            let res = {status: true, ubic: evento.target.name}
            let nameR = new RegExp(/[a-zA-Z ]$/);
            let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
            switch (evento.target.name) {
                case "dateR":
                    let x = evento.target.value.split("-").reverse().join("-");
                    if(dateR.test(x) === false|| parseInt(x.split("-")[x.split("-").length-1]) < 2000){
                        let err = {
                            message: "ingrese una fecha valida",
                            ubic: evento.target.name
                        }
                        errs.push(err);
                        res.status = false;
                    }
                break
                case "dateP":
                    let y = evento.target.value.split("-").reverse().join("-");
                    if(dateR.test(y) === false|| parseInt(y.split("-")[y.split("-").length-1]) < 2000){
                        let err = {
                            message: "ingrese una fecha valida",
                            ubic: evento.target.name
                        }
                        errs.push(err);
                        res.status = false;
                    }
                break
                case "cName":
                    if(evento.target.value.length < 5||nameR.test(evento.target.value) === false){
                        let err = {
                            message: "ingrese un nombre valido",
                            ubic: "cName"
                        }
                        res.status = false;
                        errs.push(err);
                    }
                break
                case "description":
                    console.log("2",typeof evento.target.value)
                    if(typeof evento.target.value !== "string"){
                        let err = {
                            message: "ingrese una descripcion valida",
                            ubic: "description"
                        }
                        res.status = false;
                        errs.push(err);
                    } else if(evento.target.value.length < 15){
                        let err = {
                            message: "minimo 15 caracteres",
                            ubic: "description"
                        }
                        res.status = false;
                        errs.push(err);
                    }
                break
                case "sId":
                    if(Number(evento.target.value) !== parseInt(evento.target.value) || parseInt(evento.target.value) > 6){
                        let err = {
                            message: "ingrese un servicio correcto",
                            ubic: "sId"
                        }
                        errs.push(err);
                        res.status = false;
                        res.ubic = "service"
                    }
                break
                default:{
                }
            }
            res.err = errs;
            return res;
        },
        reviewForm: (review) => {
            let errs = [];
            let res = {status: true, ubic: ""}
            let nameR = new RegExp(/[a-zA-Z ]$/);
            let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
            let x = review.dateR.split("-").reverse().join("-");
            let y = review.dateP.split("-").reverse().join("-");
            if(dateR.test(x) === false|| parseInt(x.split("-")[x.split("-").length-1]) < 2000){
                let err = {
                message: "ingrese una fecha valida",
                ubic: "dateR"
                }
                errs.push(err);
                res.status = false;
            }
            if(dateR.test(y) === false|| parseInt(y.split("-")[y.split("-").length-1]) < 2000){
                let err = {
                message: "ingrese una fecha valida",
                ubic: "dateP"
                }
                errs.push(err);
                res.status = false;
            }
            if(review.cName.length < 5||nameR.test(review.cName) === false){
                let err = {
                    message: "ingrese un nombre valido",
                    ubic: "name"
                }
                res.status = false;
                errs.push(err);
            }
            if(typeof review.description !== "string"){
                    let err = {
                        message: "ingrese una descripcion valida",
                        ubic: "description"
                    }
                    res.status = false;
                    errs.push(err);
            } else if(review.description.length < 15){
                    let err = {
                        message: "minimo 15 caracteres",
                        ubic: "description"
                    }
                    res.status = false;
                    errs.push(err);
            }
            if(Number(review.sId) !== parseInt(review.sId) || parseInt(review.sId) > 6){
                let err = {
                    message: "ingrese un servicio correcto",
                    ubic: "sId"
                }
                errs.push(err);
                res.status = false;
                res.ubic = "service"
            }
            res.err = errs;
            return res;
        },
        requestForm: (review) => {
            let errs = [];
            let res = {status: true, ubic: ""}
            let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
            let x = review.dateR.split("-").reverse().join("-");
            let y = review.dateP.split("-").reverse().join("-");
            if(dateR.test(x) === false|| parseInt(x.split("-")[x.split("-").length-1]) < 2000){
                let err = {
                message: "ingrese una fecha valida",
                ubic: "dateR"
                }
                errs.push(err);
                res.status = false;
            }
            if(dateR.test(y) === false|| parseInt(y.split("-")[y.split("-").length-1]) < 2000){
                let err = {
                message: "ingrese una fecha valida",
                ubic: "dateP"
                }
                errs.push(err);
                res.status = false;
            }
            if(Number(review.sId) !== parseInt(review.sId) || parseInt(review.sId) > 6){
                let err = {
                    message: "ingrese un servicio correcto",
                    ubic: "sId"
                }
                errs.push(err);
                res.status = false;
                res.ubic = "service"
            }
            res.err = errs;
            return res;
        },
        field: () => {

        },
    }
}

export default tools