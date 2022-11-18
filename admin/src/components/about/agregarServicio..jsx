import React, { useState } from "react";

const AgregarService = ({  setContacts, _contacts }) => {
  
  let [service, setService] = useState({ name: "", description: "" });
  let [warning, setWarning] = useState({ service: "" });

  let handleChange = (p, data) => {
    p.preventDefault();
    setService({ ...service, [p.target.name]: p.target.value });
  };

  let notErrHan = (evento) => {
    setWarning({ ...warning, [evento.target.name]: "" });
    sub();
  };

  let sub = () => {
    setContacts({ ..._contacts, servicios: [..._contacts.servicios, service] });
    setService({ name: "", description: "" });
    setWarning({ service: "" });
  };

  let handleSubmit = (p, data) => {
    p.preventDefault();
    notErrHan(p);
    // let val = validate.agregarContacto(data);
    // val.status === false ? errHan(val) : notErrHan(p);
  };

  return (
    <div className="service_ab">
      <div>
        <h3>Agregar Servicio</h3>
      </div>
      <br></br>
      <div className="addservicename">
          <div>
            <h4>Nombre</h4>
          </div>
        <div>
          <input
            className="inputcontact"
            type={"text"}
            name={"name"}
            value={service.name}
            onChange={(p) => {
              handleChange(p);
            }}
          />
        </div>
            </div>
        <div className="addservice_form">
          <div>
            <h4>Descripcion</h4>
          </div>
          <div>
            <textarea
              className="inputcontact"
              name={"description"}
              value={service.description}
              onChange={(p) => {
                handleChange(p);
              }}
            />
          </div>
          <div className="acs">{warning.service}</div>
          <div className="buttonab">
            <button onClick={(p) => handleSubmit(p, service)}> + </button>
          </div>
      </div>
    </div>
  );
};

export default React.memo(AgregarService);
