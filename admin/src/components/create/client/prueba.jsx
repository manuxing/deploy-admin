import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createClient,
  getServicio,
  setActual,
  errorForm,
  setActualG,
} from "../../../redux/actions/index.js";
import { actuallContext } from "../ActualContext";
import Form from "./Form";
import tools from "../../../tools";

const CreateClient = (  ) => {
  let validate = tools.validate;
  let dispatch = useDispatch();
  const history = useHistory();

  let actual = useSelector((state) => state.actual);
  let errForm = useSelector((state) => state.errForm);
  let services = useSelector((state) => state.servicios);
  let servicesIds = useMemo(()=>services.map(p=> p.id), [services]);

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
    "otro",
  ];

  let send = {
    input,
    warning,
    validate,
    services,
    dispatch,
    servicesIds,
    createClient,
    setInput,
    setWarning,
    contactsThg
  };

  useEffect(() => {
    if(errForm && errForm?.data){
      alert(errForm.data)
      dispatch(errorForm());
    }
  }, [errForm]);

  useEffect(() => {
    dispatch(getServicio());
  }, [dispatch]);

  useEffect(() => {
      if (typeof actual !== "number" && actual.name.toLowerCase() === input.name.toLowerCase()) {
        tools.alert("cliente",
        `/client/${actual.id}`, history);
        setInput({ name: "", contact: [],  date: "", persons: [], sId: 1000 });
        setWarning({ name: "", contact: "", date: "", persons: "", sId: "", general: "" });
        let x = document.getElementById("service");
        x.selected = true;
      }
  }, [actual]);

  return (
    <div>
      <div className="content_act">
        <div className="titlef">
          <h2>
            Cliente:
          </h2>
        </div>
        <actuallContext.Provider value={send}>
          <Form/>
        </actuallContext.Provider>
      </div>
    </div>
  );
};

export default React.memo(CreateClient);
