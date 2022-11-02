import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServicio,
  createReviews,
  getReviews,
  setActual,
  getClient,
} from "../../../redux/actions";
import tools from "../../../tools";

const ReviewR = ({ setP }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let validate = tools.validate;
  let actual = useSelector((state) => state.actual);
  let services = useSelector((state) => state.servicios);
  let servicesIds = services.map(p=> p.id);
  let clientes = useSelector((state) => state.clientes);
  let clientsNames = clientes.map(p=> p.name);
  let thg = [
    "telefono",
    "email",
    "presencial",
    "pagina",
    "booking",
    "otro",
  ];
  let [input, setInputA] = useState({
    description: "",
    dateR: "",
    dateP: "",
    thg: "",
    sId: 0,
    cName: "",
  });
  let [warningA, setWarningA] = useState({
    description: "",
    dateR: "",
    dateP: "",
    thg: "",
    sId: "",
    cName: "",
  });

  let sub = () => {
    let senr = input;
    senr.thg = input.thg;
    let x = validate.reviewForm(senr, servicesIds,clientsNames);
    if (x.status === false) {
      errHan(x);
    } else {
      dispatch(createReviews({ senr }));
    }
  };

  let errHan = (err, evento) => {
    if (evento) {
      setInputA({ ...input, [evento.target.name]: evento.target.value });
    }
    let id = err.ubic === "service" ? "service" : "";
    if (id === "service") {
      let x = document.getElementById(id);
      x.selected = true;
      setInputA({ ...input, sId: "" });
    }
    let copy = warningA;
    err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
    setWarningA(copy);
  };

  let notErrHan = (evento) => {
    setInputA({ ...input, [evento.target.name]: evento.target.value });
    setWarningA({ ...warningA, [evento.target.name]: "" });
  };

  let handleSelect = (evento) => {
    let err = validate.reviewForm_field(evento, servicesIds);
    err.status === true ? notErrHan(evento) : errHan(err);
  };

  let handleChange = (evento) => {
    let val = validate.reviewForm_field(evento, servicesIds);
    val.status === true ? notErrHan(evento) : errHan(val, evento);
  };
  
  let handleSubmit = (e, inp) => {
    e.preventDefault();
    let x = validate.reviewForm(inp, servicesIds, clientsNames);
    x.status === false ? errHan(x) : sub();
  };
  
  useEffect(() => {
    dispatch(getServicio());
    dispatch(getClient());
  }, [dispatch]);

  useEffect(() => {
    if (actual !== 1 && input.dateR === actual.dateR) {
      tools.alert(
        "reseña",
        `/review/${actual.id}`,
        history,
        dispatch,
        getReviews,
        setP,
        setActual
      );
      let x = document.getElementById("service");
      x.selected = true;
      let y = document.getElementById("s");
      y.selected = true;
      setInputA({
        description: "",
        dateR: "",
        dateP: "",
        thg: "",
        sId: 0,
        cName: "",
      });
      setWarningA({
        description: "",
        dateR: "",
        dateP: "",
        thg: "",
        sId: "",
        cName: "",
      });
    }
  }, [actual]);


  return (
    <div>
      <div className="content_act">
        Reseña:
        <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
          <div>
            <label>Fecha de la reseña</label>
            <input
              className="input"
              type={"date"}
              placeholder="date"
              name={"dateR"}
              value={input.dateR}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warningA.dateR}</div>
          </div>
          <div>
            <label>Fecha de la actividad</label>
            <input
              className="input"
              type={"date"}
              placeholder="date"
              name={"dateP"}
              value={input.dateP}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warningA.dateP}</div>
          </div>
          <div>
          <label>Cliente</label>
              <input list="clients"
                className="input"
                type={"text"}
                placeholder="Nombre"
                name={"cName"}
                value={input.cName}
                onChange={(p) => handleChange(p)}
              />
                <datalist id="clients">
                  {
                    clientsNames && clientsNames.map(p=>{
                      return(
                        <option key={p}value={p}/>
                      )
                    })
                  }
                </datalist>
            <div className="warning">{warningA.cName}</div>
          </div>
          <div>
            <label>Descripcion</label>
            <textarea
              className="input"
              type={"text"}
              placeholder="Descripcion"
              name={"description"}
              value={input.description}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warningA.description}</div>
          </div>
          <div>
            <select
              className="selectcontact"
              name={"thg"}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <option id="s" hidden>
                medio de contacto
              </option>
              {thg.map((p) => {
                return (
                  <option value={p} key={p}>
                    {p}
                  </option>
                );
              })}
            </select>
            <div className="warning">{warningA.thg}</div>
          </div>
          <div>
            <label>Servicios</label>
            <select
              className="selectageR"
              name={"sId"}
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <option id="service" hidden>
                seleccione
              </option>
              {services.map((p) => {
                return (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                );
              })}
            </select>
            <div className="warning">{warningA.sId}</div>
          </div>
          <div className="warning">{warningA.general}</div>
          <input className="input" type={"submit"} name={"submit"} />
        </form>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default ReviewR;
