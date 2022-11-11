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
    reviewForm_field: (evento, servicesIds) => {
      let errs = [];
      let res = { status: true, ubic: evento.target.name };
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
      let nameR = new RegExp(/[a-zA-Z]$/);
      let dateR = new RegExp(
        /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
        );
        let x = review.dateR.split("-").reverse().join("-");
        if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000 ) {
          let err = {
            message: "ingrese una fecha valida",
          ubic: "dateR",
        };
        errs.push(err);
        res.status = false;
      }
      if (!nameR.test(review.cName)) {
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
      console.log(res.err)
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
      if (dateR.test(x) === false || parseInt(x.split("-")[x.split("-").length - 1]) < 2000 ) {
        let err = {
          message: "ingrese una fecha valida",
          ubic: "dateR",
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
  alert: (art, url, cb, cb2, cb3, v3, cb4, cb5) => {
    let fem = ["reseña", "solicitud", "actividad"];
    let f = fem.includes(art) ? "a" : "o";
    let sign = prompt(
      `su ${art} fue cread${f} exitosamente, desea quedarse en la lista o ser redirigidx al detalle`
    );
    if(!sign || sign.length < 1){
      cb2(cb3(v3));
      cb2(cb5());
    } else {
      cb.push(`${url}`);
      cb4(false);
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
