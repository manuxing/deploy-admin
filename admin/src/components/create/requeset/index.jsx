import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServicio,
  createSolicitud,
  getSolicitudes,
  setActual,
} from "../../../redux/actions";
import AgregarContacto from "./agregarContacto";
import ContactCard from "./contactCard";
import tools from "../../../tools";

const RequestR = ({ setP }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let validate = tools.validate
  ;
  let actual = useSelector((state) => state.actual);
  let services = useSelector((state) => state.servicios);
  let servicesIds = services.map(p=> p.id);
  let thg = [
    "telefono",
    "email",
    "presencial",
    "pagina",
    "booking",
    "otro",
  ];
  let [input, setInputA] = useState({
    dateR: "",
    dateP: "",
    thg: "",
    contact: [],
    sId: 0,
    solicitante: "",
  });
  let [warningA, setWarningA] = useState({
    dateR: "",
    dateP: "",
    thg: "",
    contact: "",
    sId: "",
    solicitante: "",
  });

  let sub = () => {
    let senr = input;
    senr.thg = input.contact[0].type;
    let x = validate.requestForm(senr, servicesIds);
    if (x.status === false) {
      errHan(x);
    } else {
      dispatch(createSolicitud({ senr }));
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
    let err = validate.requestForm_field(evento, servicesIds);
    err.status === true ? notErrHan(evento) : errHan(err);
  };

  let handleChange = (evento) => {
    let val = validate.reviewForm_field(evento, servicesIds);
    val.status === true ? notErrHan(evento) : errHan(val, evento);
  };
  
  let handleSubmit = (e, inp) => {
    e.preventDefault();
    let x = validate.requestForm(inp, servicesIds);
    x.status === false ? errHan(x) : sub();
  };
  
  useEffect(() => {
    dispatch(getServicio());
  }, [dispatch]);

  useEffect(() => {
    if (actual !== 1) {
      tools.alert(
        "solicitud",
        `/request/${actual.id}`,
        history,
        dispatch,
        getSolicitudes,
        setP,
        setActual
      );
      setInputA({ dateR: "", dateP: "", thg: "", contact: [], sId: 0 });
      setWarningA({ dateR: "", dateP: "", thg: "", contact: "", sId: "" });
      let x = document.getElementById("service");
      x.selected = true;
    }
  }, [actual, input]);


  return (
    <div>
      <div className="content_act">
        solicitud:
        <form className="form" onSubmit={(e) => handleSubmit(e, input)}>
          <div>
            <label>Fecha de la solicitud</label>
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
            <label>Fecha solicitada</label>
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
            <label>Fecha solicitada</label>
            <input
              className="input"
              type={"text"}
              placeholder="Solicitante"
              name={"solicitante"}
              value={input.solicitante}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warningA.solicitante}</div>
          </div>
          <div>
            <AgregarContacto
              contactsThg={thg}
              setContacts={setInputA}
              _contacts={input}
            />
          </div>
          <div>
            {input.contact.map((p) => {
              return <ContactCard key={input.contact.length} contact={p} />;
            })}
          </div>
          <div className="warning">{input.contact.length > 0 ? "":warningA.contact}</div>
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
                  <option value={parseInt(p.id)} key={p.id}>
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

export default RequestR;
