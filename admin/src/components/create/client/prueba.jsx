import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createClient,
  getClient,
  setActual,
} from "../../../redux/actions/index.js";
import AgregarContacto from "./agregarContacto.jsx";
import ContactCard from "./contactCard.jsx";
import ActivityR from "./activityR";
import tools from "../../../tools";
// import "./Form.css";

const Form = ({ setP }) => {
  let validate = tools.validate;
  let dispatch = useDispatch();
  let actual = useSelector((state) => state.actual);
  let [submited, setSubmited] = useState(false);
  let [pressed, setPressed] = useState(false);
  let [input, setInput] = useState({ name: "", contact: [], act: "no" });
  let [warning, setWarning] = useState({
    name: "",
    contact: "",
    activity: "",
    general: "",
  });
  let [contactsThg] = useState([
    "telefono",
    "email",
    "presencial",
    "pagina",
    "booking",
    "otro",
  ]);
  const history = useHistory();
  
  let errHan = (evento, err) => {
    if (evento) {
      setInput({ ...input, [evento.target.name]: evento.target.value });
    }
    let copy = warning;
    err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
    setWarning(copy);
  };
  
  let handleChange = (evento) => {
    let val = validate.clientForm_field(evento);
    val.status === true ? notErrHan(evento) : errHan(evento, val);
  };
  
  let notErrHan = (evento) => {
    setInput({ ...input, [evento.target.name]: evento.target.value });
    setWarning({ ...warning, [evento.target.name]: "" });
  };

  let sub = () => {
    let send = input;
    let x = validate.clientForm(send);
    if (x.status === false) {
      errHan(null, x);
    } else {
      setSubmited(true);
      dispatch(createClient(send));
    }
  };

  let handleSubmit = (p, input) => {
    p.preventDefault();
    setPressed(true);
  };

  useEffect(() => {
    if (input.act !== "no") {
      sub();
    }
  }, [input]);

  useEffect(() => {
    if (submited === true) {
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
        setInput({ name: "", contact: [], act: "no" });
        setWarning({ name: "", contact: "", activity: "", general: "" });
        setSubmited(false);
      }
    }
  }, [submited, actual]);

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
          <div>
            {input.contact.map((p) => {
              return <ContactCard key={p.value} contact={p} />;
            })}
            <div className="warning">{warning.contact}</div>
          </div>
          <ActivityR
            submitted={submited}
            pressed={pressed}
            setPressed={setPressed}
            act={input}
            setAct={setInput}
          />
          <button onClick={(e) => handleSubmit(e, input)}/>
        </form>
        <button onClick={() => setP(false)}>cerrar</button>
      </div>
    </div>
  );
};

export default Form;
