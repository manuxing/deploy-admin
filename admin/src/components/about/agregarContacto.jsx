import React, { useState } from "react";
import tools from "../../tools";

const AgregarContacto = ({ contactsThg, setContacts, _contacts }) => {
  
  let [contact, setContact] = useState({ type: "", value: "" });
  let [warning, setWarning] = useState({ contacto: "" });
  let validate = tools.validate;

  let handleSelect = (evento) => {
    setContact({ type: evento.target.value, value: "" });
    setWarning({ contacto: "" });
  };

  let chooseType = (t) => {
    if (t === "telefono") return "number";
    if (t === "email") return "email";
    return "text";
  };

  let handleChange = (p, data) => {
    p.preventDefault();
    setContact({ ...contact, value: p.target.value });
  };

  let errHan = (err) => {
    err.err.map((p) => setWarning({ ...warning, [p.ubic]: p.message }));
  };

  let notErrHan = (evento) => {
    setWarning({ ...warning, [evento.target.name]: "" });
    sub();
  };

  let sub = () => {
    if (contact.value === ""&&contact.type.length > 0) contact.value = contact.type;
    if (contact.type === ""&&contact.value.length > 0) contact.type = contact.value;
    setContacts({ ..._contacts, contact: [..._contacts.contact, contact] });
    setWarning({ contact: "" });
    setContact({ type: "", value: "" });
    let x = document.getElementById("id");
    x.selected = true;
  };

  let handleSubmit = (p, data) => {
    p.preventDefault();
    let val = validate.agregarContacto(data);
    val.status === false ? errHan(val) : notErrHan(p);
  };

  return (
    <div className="addcontact">
      <div className="addcontact_form">
        <label>Contacto</label>
        <select
          className="selectcontact"
          name={"contact"}
          onChange={(e) => handleSelect(e)}
        >
          <option id={"id"}hidden>medio de contacto</option>
          {contactsThg && contactsThg.length > 0 &&
           contactsThg.map((p) => {
            return (
              <option value={p} key={p}>
                {p}
              </option>
            );
          })}
        </select>
        {contact.type === "pagina" ||
        contact.type === "booking" ||
        contact.type === "presencial" ||
        contact.type === "" ? (
          <></>
        ) : (
          <input
            className="inputcontact"
            type={chooseType(contact.type)}
            name={"value"}
            value={contact.value}
            onChange={(p) => {
              handleChange(p);
            }}
          />
        )}
        <div className="warning_acs">{warning.contacto}</div>
        <button onClick={(p) => handleSubmit(p, contact)} />
      </div>
    </div>
  );
};

export default React.memo(AgregarContacto);
