const tools = {
  display: {
    activity: {
      dash: (dis) => {
        return dis.contact ? (
          <div>
            <p>{dis.name}</p>
            {dis.contact.map((p) => {
              return <p key={p}>{p}</p>;
            })}
          </div>
        ) : (
          <div>
            <p>{dis.name}</p>
          </div>
        );
      },
    },
    review: {
      dash: (dis) => {
        return (
          <div>
            <p key={dis[0].id}>{dis[0].name}</p>
          </div>
        );
      },
    },
  },
  validate: {
    login: (user) => {
      let res = { status: true };
      let errs = [];
      let reg = new RegExp(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/);
      let vals = Object.values(user);
      
      if(vals.length !== 2||vals.includes(undefined)|| vals.includes(null)){
        let err = {
          message: "complete los campos",
          ubic: "gral",
        };
        errs.push(err);
        res.status = false;
      }

      vals.forEach(p => {
        if(typeof p !== 'string'){
          let err = {
            message: "revise los campos",
            ubic: "gral",
          };
          errs.push(err);
          res.status = false;
        }
      })

      if (reg.test(user.email) === false) {
              let err = {
                message: "email invalido",
                ubic: "email",
              };
              errs.push(err);
              res.status = false;
          }

      if (user.password.length < 6 || user.password.length > 30) {
        let err = {
          message: "contraseña invalida",
          ubic: "password",
        };
        errs.push(err);
        res.status = false;
      }
      
      res.err = errs;
      return res
    },
    agregarContacto: (con) => {
      let res = { status: true };
      let errs = [];
      switch (con.type) {
        case "telefono":
          {
            let reg = new RegExp(
              /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
            );
            if (reg.test(con.value) === false || con.value.length > 13) {
              let err = {
                message: "telefono invalido",
                ubic: "contacto",
              };
              errs.push(err);
              res.status = false;
            }
          }
          break;
        case "email":
          {
            let reg = new RegExp(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/);
            if (reg.test(con.value) === false) {
              let err = {
                message: "email invalido",
                ubic: "contacto",
              };
              errs.push(err);
              res.status = false;
            }
          }
          break;
          case "url":
              console.log("")
            break;
        default: {
          let values = ["presencial", "booking", "pagina", "otro"];
          if (values.includes(con.value) === false && values.includes(con.type) === false ) {
            let err = {
              message: "contacto invalido",
              ubic: "contacto",
            };
            errs.push(err);
            res.status = false;
          }
        }
      }
      res.err = errs;
      return res;
    },
    agregarMedio: (con) => {
      let res = { status: true };
      let errs = [];
      let medios = [
        "telefono",
        "email",
        "presencial",
        "pagina",
        "booking",
        "otro",
      ];
      if (medios.includes(con.value) === false) {
        let err = {
          message: "rango de edad invalido",
          ubic: "thg",
        };
        errs.push(err);
        res.status = false;
      }
      res.err = errs;
      return res;
    },
    agregarPersona_field: (field) => {
      field.p ? field = field.p : console.log(1)
      let res = { status: true, ubic: field.target.name };
      let errs = [];
      let sexos = ["Femenino", "Masculino", "otro"];
      let ageR = ["Adulto Mayor", "Adulto", "Adolecente", "niño"];
      switch (field.target.name) {
        case "ageR":
          if (ageR.includes(field.target.value) === false) {
            let err = {
              message: "rango de edad invalido",
              ubic: "ageR",
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "sexo":
          if (sexos.includes(field.target.value) === false) {
            let err = {
              message: "sexo invalido",
              ubic: "sexo",
            };
            errs.push(err);
            res.status = false;
          }

          break;
        default: {
        }
      }
      res.err = errs;
      return res;
    },
    agregarPersona: function(persona, cb) {
      let res = { status: true };
      let resX = [];
      let obj = {
        p:{
          target: {
            name: "ageR",
            value: persona.ageR,
          },
        }
      };
      let checkA = cb(obj);
      resX.push(checkA);
      obj.p.target.name = "sexo";
      obj.p.target.value = persona.sexo;
      let checkS = cb(obj);
      resX.push(checkS);
      res.res = resX;
      res.errs = resX.map((p) => {
        if (p.status === false) {
          res.status = false;
          return p.err;
        }
      });
      return res;
    },
    activity_client_field: (p, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: p.target.name };
      let dateR = new RegExp(
        /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
      );
      switch (p.target.name) {
        case "date":
          let x = p.target.value.split("-").reverse().join("-");
          if ( dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
            let err = {
              message: "ingrese una fecha valida",
              ubic: "date",
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "sId":
          if (p.target.value.length > 2 ||!servicesIds.includes(parseInt(p.target.value))) {
            let err = {
              message: "ingrese un servicio correcto",
              ubic: "sId",
            };
            errs.push(err);
            res.status = false;
            res.ubic = "service";
          }
          break;
        default: {
        }
      }
      res.err = errs;
      return res;
    },
    activity_clientForm: (act, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: "activityForm" };
      let dateR = new RegExp(
        /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
      );
      let x = act.date.split("-").reverse().join("-");
      if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "date",
        };
        errs.push(err);
        res.status = false;
      }
      if (typeof act.persons !== "object") {
        let err = {
          message: "revise el campo personas, no deberia cambiar de array",
          ubic: "persons",
        };
        errs.push(err);
        res.status = false;
      }
      if (act.sId.length > 2 ||!servicesIds.includes(parseInt(act.sId))) {
        let err = {
          message: "ingrese un servicio correcto",
          ubic: "sId",
        };
        errs.push(err);
        res.status = false;
        res.ubic = "service";
      }
      res.err = errs;
      return res;
    },
    activityForm: (act, servicesIds, clientsNames) => {
      let errs = [];
      let res = { status: true, ubic: "activityForm" };
      let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
      let x = act.date.split("-").reverse().join("-");
      if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "date",
        };
        errs.push(err);
        res.status = false;
      }
      if (!clientsNames.includes(act.name)) {
        let err = {
          message: "ingrese un nombre valido",
          ubic: "name",
        };
        errs.push(err);
        res.status = false;
      }
      if (typeof act.persons !== "object"|| act.persons.length < 1) {
        let err = {
          message: "revise el campo personas, no deberia cambiar de array",
          ubic: "persons",
        };
        errs.push(err);
        res.status = false;
      }
      if (act.sId.length > 2 ||!servicesIds.includes(parseInt(act.sId))) {
        let err = {
          message: "ingrese un servicio correcto",
          ubic: "sId",
        };
        errs.push(err);
        res.status = false;
        res.ubic = "service";
      }
      res.err = errs;
      return res;
    },
    clientForm_field: (evento, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: evento.target.name };
      let nameR = new RegExp(/[a-zA-Z ]$/);
      let dateR = new RegExp(
        /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
      );
      switch (evento.target.name) {
        case "name":
          if (nameR.test(evento.target.value) === false) {
            let err = {
              message: "ingrese un nombre valido",
              ubic: "name",
          };
          res.status = false;
          errs.push(err);
        }
          break;
        case "contact":
          if (typeof evento.target.value !== "object") {
            let err = {
              message: "revise los contactos, no deberia cambiar de array",
              ubic: "contacts",
            };
            res.status = false;
            errs.push(err);
          }
          break;
        case "date":
          let x = evento.target.value.split("-").reverse().join("-");
          if ( dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
            let err = {
              message: "ingrese una fecha valida",
              ubic: "date",
            };
            errs.push(err);
            res.status = false;
          }
        break;
        case "sId":
          if (evento.target.value.length > 2 ||!servicesIds.includes(parseInt(evento.target.value))) {
            let err = {
              message: "ingrese un servicio correcto",
              ubic: "sId",
            };
            errs.push(err);
            res.status = false;
            res.ubic = "service";
          }
        break;
        default: {
        }
      }
      res.err = errs;
      return res;
    },
    clientForm: (client, servicesIds) => {
      let {act} = client;
      let errs = [];
      let res = { status: true, ubic: "clientForm" };
      let nameR = new RegExp(/[a-zA-Z ]$/);
      let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
      if (nameR.test(client.name) === false) {
        let err = {
          message: "ingrese un nombre valido",
          ubic: "name",
        };
        res.status = false;
        errs.push(err);
      }
      if (typeof client.contact !== "object" || client.contact.length < 1) {
        let err = {
          message: "revise los contactos, no deberia cambiar de array",
          ubic: "contact",
        };
        res.status = false;
        errs.push(err);
      }
      if (typeof act.persons !== "object"|| act.persons.length < 1) {
        let err = {
          message: "revise el campo personas, no deberia cambiar de array",
          ubic: "persons",
        };
        errs.push(err);
        res.status = false;
      }
      let x = act.date.split("-").reverse().join("-");
      if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "date",
        };
        errs.push(err);
        res.status = false;
      }
      if (act.sId.length > 2 ||!servicesIds.includes(parseInt(act.sId))) {
        let err = {
          message: "ingrese un servicio correcto",
          ubic: "sId",
        };
        errs.push(err);
        res.status = false;
        res.ubic = "service";
      }
      res.err = errs;
      return res;
    },
    serviceField: (evento) => {
      let errs = [];
      let res = { status: true, ubic: evento.target.name };
      let nameR = new RegExp(/[a-zA-Z ]$/);
      let timeR = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]?");
      switch (evento.target.name) {
        case "name":
          if (nameR.test(evento.target.value) === false) {
            let err = {
              message: "ingrese un nombre valido",
              ubic: evento.target.name,
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "tR":
          if(timeR.test(evento.target.value) === false){
              let err = {
                  message: "ingrese un horario valido",
                  ubic: "tR"
              }
              res.status = false;
              errs.push(err);
          }
          break;
        case "tR_":
          if(timeR.test(evento.target.value) === false){
            let err = {
                message: "ingrese un horario valido",
                ubic: "tR_"
            }
            res.status = false;
            errs.push(err);
        }
        break;
        case "description":
          if (typeof evento.target.value !== "string") {
            let err = {
              message: "ingrese una descripcion valida",
              ubic: "description",
            };
            res.status = false;
            errs.push(err);
          } else if (evento.target.value.length < 15) {
            let err = {
              message: "minimo 15 caracteres",
              ubic: "description",
            };
            res.status = false;
            errs.push(err);
          }
          break;
        default: {
        }
      }
      res.err = errs;
      return res;
    },
    serviceForm: (service) => {
      let errs = [];
      let res = { status: true, ubic: "" };
      let timeR = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]?");
      let nameR = new RegExp(/[a-zA-Z ]$/);
      if (service.name.length < 5 || nameR.test(service.name) === false) {
        let err = {
          message: "ingrese un nombre valido",
          ubic: "name",
        };
        res.status = false;
        errs.push(err);
      }
      if (typeof service.description !== "string") {
        let err = {
          message: "ingrese una descripcion valida",
          ubic: "description",
        };
        res.status = false;
        errs.push(err);
      } else if (service.description.length < 15) {
        let err = {
          message: "minimo 15 caracteres",
          ubic: "description",
        };
        res.status = false;
        errs.push(err);
      }
      if (timeR.test(service.tR) === false) {
        let err = {
          message: "ingrese un horario valido",
          ubic: "tR",
        };
        res.status = false;
        errs.push(err);
      }
      if (timeR.test(service.tR_) === false) {
        let err = {
          message: "ingrese un horario valido",
          ubic: "tR_",
        };
        res.status = false;
        errs.push(err);
      }
      res.err = errs;
      return res;
    },
    reviewForm_field: (evento, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: evento.target.name };
      let medios = [
        "telefono",
        "email",
        "presencial",
        "pagina",
        "booking",
        "otro",
      ];
      let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
      switch (evento.target.name) {
        case "dateR":
          let x = evento.target.value.split("-").reverse().join("-");
          if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
            let err = {
              message: "ingrese una fecha valida",
              ubic: evento.target.name,
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "dateP":
          let y = evento.target.value.split("-").reverse().join("-");
          if ( dateR.test(y) === false || parseInt(y.split("-")[y.split("-").length - 1]) < 2000 ) {
            let err = {
              message: "ingrese una fecha valida",
              ubic: evento.target.name,
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "description":
          if (typeof evento.target.value !== "string") {
            let err = {
              message: "ingrese una descripcion valida",
              ubic: "description",
            };
            res.status = false;
            errs.push(err);
          } else if (evento.target.value.length < 15) {
            let err = {
              message: "minimo 15 caracteres",
              ubic: "description",
            };
            res.status = false;
            errs.push(err);
          }
          break;
        case "thg":
          if (medios.includes(evento.target.value) === false) {
            let err = {
              message: "ingrese un medio valido",
              ubic: "thg",
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "sId":
            if (evento.target.value.length > 2 ||!servicesIds.includes(parseInt(evento.target.value))) {
              let err = {
                message: "ingrese un servicio correcto",
                ubic: "sId",
              };
              errs.push(err);
              res.status = false;
              res.ubic = "service";
            }
            break;
        default: {
        }
      }
      res.err = errs;
      return res;
    },
    reviewForm: (review, servicesIds, clientsNames) => {
      let errs = [];
      let res = { status: true, ubic: "" };
      let medios = [
        "telefono",
        "email",
        "presencial",
        "pagina",
        "booking",
        "otro",
      ];
      let dateR = new RegExp(
        /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
      );
      let x = review.dateR.split("-").reverse().join("-");
      let y = review.dateP.split("-").reverse().join("-");
      if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000 ) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "dateR",
        };
        errs.push(err);
        res.status = false;
      }
      if ( dateR.test(y) === false ||parseInt(y.split("-")[y.split("-").length - 1]) < 2000) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "dateP",
        };
        errs.push(err);
        res.status = false;
      }
      if (!clientsNames.includes(review.cName)) {
        let err = {
          message: "ingrese un nombre valido",
          ubic: "cName",
        };
        errs.push(err);
        res.status = false;
      }
      if (typeof review.description !== "string") {
        let err = {
          message: "ingrese una descripcion valida",
          ubic: "description",
        };
        res.status = false;
        errs.push(err);
      } else if (review.description.length < 15) {
        let err = {
          message: "minimo 15 caracteres",
          ubic: "description",
        };
        res.status = false;
        errs.push(err);
      }
      if (medios.includes(review.thg) === false) {
        let err = {
          message: "ingrese un medio valido",
          ubic: "thg",
        };
        errs.push(err);
        res.status = false;
      }
      if (review.sId.length > 2 ||!servicesIds.includes(parseInt(review.sId))) {
        let err = {
          message: "ingrese un servicio correcto",
          ubic: "sId",
        };
        errs.push(err);
        res.status = false;
        res.ubic = "service";
      }
      res.err = errs;
      return res;
    },
    requestForm_field: (evento, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: "" };
      let dateR = new RegExp(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/);
      let nameR = new RegExp(/[a-zA-Z]$/);
      switch (evento.target.name) {
        case "dateR":
          let x = evento.target.value.split("-").reverse().join("-");
          if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000) {
            let err = {
              message: "ingrese una fecha valida",
              ubic: evento.target.name,
            };
            errs.push(err);
            res.status = false;
          }
          break;
        case "dateP":
          let y = evento.target.value.split("-").reverse().join("-");
          if ( dateR.test(y) === false || parseInt(y.split("-")[y.split("-").length - 1]) < 2000 ) {
            let err = {
              message: "ingrese una fecha valida",
              ubic: evento.target.name,
            };
            errs.push(err);
            res.status = false;
          }
          break;
          case "sId":
            if (evento.target.value.length > 2 ||!servicesIds.includes(parseInt(evento.target.value))||evento.target.value.length > 50) {
              let err = {
                message: "ingrese un servicio correcto",
                ubic: "sId",
              };
              errs.push(err);
              res.status = false;
              res.ubic = "service";
            }
            break;
          case "solicitante":
          if (evento.target.length > 0 && nameR.test(evento.target.value) === false) {
            let err = {
              message: "ingrese un nombre de solicitantevalido",
              ubic: evento.target.name,
            };
            errs.push(err);
            res.status = false;
          }
          break;
        default: {
        }
      }
      res.err = errs;
      return res;
    },
    requestForm: (review, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: "" };
      let nameR = new RegExp(/[a-zA-Z ]$/);
      let dateR = new RegExp(
        /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
      );
      let x = review.dateR.split("-").reverse().join("-");
      let y = review.dateP.split("-").reverse().join("-");
      if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000 ) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "dateR",
        };
        errs.push(err);
        res.status = false;
      }
      if (dateR.test(y) === false || parseInt(y.split("-")[y.split("-").length - 1]) < 2000 ) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "dateP",
        };
        errs.push(err);
        res.status = false;
      }
      if (nameR.test(review.solicitante) === false) {
        let err = {
          message: "ingrese un nombre de solicitante valido",
          ubic: "solicitante",
        };
        errs.push(err);
        res.status = false;
      }
      if (review.contact.length < 1|| review.contact.length > 1 || typeof review.contact !== "object") {
        let err = {
          message: "ingrese un contacto correcto",
          ubic: "contact",
        };
        errs.push(err);
        res.status = false;
        res.ubic = "service";
      }
      if (review.sId.length > 2 ||!servicesIds.includes(parseInt(review.sId))) {
        let err = {
          message: "ingrese un servicio correcto",
          ubic: "sId",
        };
        errs.push(err);
        res.status = false;
        res.ubic = "service";
      }
      res.err = errs;
      return res;
    },
  },
  formActions:{
    subL: {
      errHandler: function (force, err, input, setInput, warning, setWarning) {
        if(force){
          force.map(p => p.id=== err.ubic ? p.selected = true: console.log("no"));
          setInput({ ...input, [err.ubic]: '' })
        }
        err.err.map((p) => setWarning({ ...warning, [p.ubic]: p.message }))
      },
      notErrHandler: function ( input, setInput, evento, warning, setWarning )  {
        let prepare_notErr = (input, evento, warning)=>{
          let res;
          input ?
            res = { ...input, [evento.target.name]: evento.target.value } :
            res = { ...warning, [evento.target.name]: '' }
            return res
        }
        setInput(prepare_notErr(input, evento, null));
        setWarning(prepare_notErr(null, evento, warning));
      },
      handleChange: function (evento) {
        let { validate, force, warning, input, setInput, setWarning } = evento.vals;
        let { errHandler, notErrHandler} = evento;
        let val = validate(evento);
        val.status === true ? notErrHandler(input, setInput, evento.p, warning, setWarning) : errHandler(force, val, input, setInput, warning, setWarning);
      },
      sub: (set, clear, _in) => {
        set.forEach(p =>{
          let res =p.val(_in)
          p.cb(res)
        });
        clear.forEach(p => p.cb(p.val));
      },
      handleSub: function(p, sub){
        p.preventDefault();
        let {validate, cbValidate, input, cb, warning, seteo} = sub;
        let val = validate(input, cbValidate);
        val.status === false
          ? seteo.vals.setWarning({ ...warning, general: "Advertencia, revise los campos" })
          : cb(seteo.vals.set, seteo.vals.clear, seteo.vals.input);  
      },
    },
  },
  alert: (art, url, cb) => {
    let fem = ["reseña", "solicitud", "actividad"];
    let f = fem.includes(art) ? "a" : "o";
    let sign = prompt(
      `su ${art} fue cread${f} exitosamente, desea quedarse en la lista o ser redirigidx al detalle`
    );
    if(!sign || sign.length < 1){
    } else {
      cb.push(`${url}`);
    }
  },
  alert_notFound: ( model, cb, url) => {
    alert(
      `el id del ${model} es invalido`
    );
    cb.push(url)
  },
  build: async (cb, actions) => {
    let hacer = actions.map(async p =>{
      new Promise(async(resolve)=>await cb(p()));
    })
    await Promise.all(hacer);
    return 0
  },
  getSetter: (data, state) => {
    let stat = data.pop();
    let stats =  state.all.stats.filter(p=> p.name !== stat.name)
    stats.push(stat);
    return {data, stats};
  },
  getSetter_: (stat, state) => {
    let stats =  state.all.stats.filter(p=> p.name !== stat.name)
    stats.push(stat);
    return stats;
  },
};

export default tools;
