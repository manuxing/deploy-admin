import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createClient,
  getServicio,
  getClient,
  setActual,
} from "../../../redux/actions/index.js";
import AgregarContacto from "./agregarContacto.jsx";
import ContactCard from "./contactCard.jsx";
import AgregarPersona from "../activity/agregarPersona.jsx";
import PersonCard from "../activity/personaCard";
import tools from "../../../tools";
// import "./Form.css";

const Form = ({ setP }) => {
  let validate = tools.validate;
  let dispatch = useDispatch();
  const history = useHistory();

  let actual = useSelector((state) => state.actual);
  let errForm = useSelector((state) => state.errForm);
  let services = useSelector((state) => state.servicios);
  let servicesIds = services.map(p=> p.id);

  let [input, setInput] = useState({ name: "", contact: [], date: "", persons: [], sId: 1000 });
  let [warning, setWarning] = useState({
    name: "",
    contact: "",
    date: "",
    persons: "",
    sId: "",
    general: "",
  });
  let contactsThg = ["telefono",
    "email",
    "presencial",
    "pagina",
    "booking",
    "otro",
  ];

  let handleChange = (evento) => {
    let val = validate.clientForm_field(evento, servicesIds);
    val.status === true ? notErrHan(evento) : errHan(evento, val);
  };
  
  let errHan = (evento, err) => {
    let id = err.ubic === "service" ? "service" : "";
    if (id === "service") {
      let x = document.getElementById(id);
      x.selected = true;
      setInput({ ...input, sId: "" });
    }
    if (evento) {
      setInput({ ...input, [evento.target.name]: evento.target.value });
    }
    let copy = warning;
    err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
    setWarning(copy);
  };
  
  let notErrHan = (evento) => {
    setInput({ ...input, [evento.target.name]: evento.target.value });
    setWarning({ ...warning, [evento.target.name]: "" });
  };

  let sub = () => {
    let res = {
      name: input.name,
      contact: input.contact,
      act: {
        date: input.date,
        persons: input.persons,
        sId: input.sId,
      }
    };
    let x = validate.clientForm(res, servicesIds);
    if (x.status === false) {
      errHan(null, x);
    } else {
      dispatch(createClient(res));
    }
  };

  let handleSubmit = (p, input) => {
    console.log(input)
    p.preventDefault();
    let res = {
      name: input.name,
      contact: input.contact,
      act: {
        date: input.date,
        persons: input.persons,
        sId: input.sId,
      }
    };
    let x = validate.clientForm(res, servicesIds);
    x.status === false ? errHan(null, x) : sub();
  };

  useEffect(() => {
    if(errForm && errForm?.data)alert(errForm.data)
  }, [errForm]);

  useEffect(() => {
    dispatch(getServicio());
  }, [dispatch]);

  useEffect(() => {
      if (typeof actual !== "number") {
        tools.alert(
          "cliente",
          `/client/${actual.id}`,
          history,
          dispatch,
          getClient,
          setP,
          setActual
        );
        setInput({ name: "", contact: [],  date: "", persons: [], sId: 1000 });
        setWarning({ name: "", contact: "", date: "", persons: "", sId: "", general: "" });
      }
  }, [actual]);

  return (
    <div>
      <div className="content_act">
        Cliente:
        <form className="form" >
          <div>
            <label>Nombre</label>
            <input
              className="input"
              type={"text"}
              placeholder="Name"
              name={"name"}
              value={input.name}
              onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.name}</div>
          </div>
          <AgregarContacto
            contactsThg={contactsThg}
            setContacts={setInput}
            _contacts={input}
          />
          <div className="warning">{warning.contact}</div>
          <div>
            {input.contact.map((p) => {
              return <ContactCard key={p.value} contact={p} />;
            })}
          </div>
          <div>
            <label>Fecha de la actividad</label>
            <input
            className="input"
            type={"date"}
            placeholder="date"
            name={"date"}
            value={input.date}
            onChange={(p) => handleChange(p)}
            />
            <div className="warning">{warning.date}</div>
          </div>
            <AgregarPersona setPersons={setInput} _persons={input} />
          <div>
          {input.persons.length > 0 && input.persons.map((p) => {
            return (
              <PersonCard key={ input.persons.length} person={p} />
            )
          })}
          </div>
        <div>
          <label>Servicios</label>
          <select
            className="selectageR"
            name={"sId"}
            onChange={(e) => {
              handleChange(e);
            }}
          >
          <option id="service" hidden>
            seleccione
          </option>
          {services.map((p) => {
            return (
              <option value={p.id} key={`${p.id}`}>
                {p.name}
              </option>
            );
          })}
        </select>
        <div className="warning">{warning.sId}</div>
        </div>
          <button onClick={(e) => handleSubmit(e, input)}/>
        </form>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default Form;
