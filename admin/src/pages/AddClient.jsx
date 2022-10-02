import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//utils
// import validateAdd from "../utils/ValidateAdd";
//Actions
import { createClient } from "../redux/actions";

const AddClient = () => {
  
  let history = useHistory();
  let dispatch = useDispatch();
  let services = useSelector(state => state.servicios);
  let [input, setInput] = useState({
    name: "",
    email: "",
    telefono:""
  });
  let [inputAct, setAct] = useState({
    name: input.name,
    date: "",
    persons:[],
    sId: "",
  });

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  function handleChange(event) {
    setInput((previus) => {
      return {
        ...previus,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChangeAct(event) {
    setAct((previus) => {
      return {
        ...previus,
        [event.target.name]: event.target.value,
      };
    });
  }
  
  function handleSelectService(event){
    setAct((previus) => {
      return {
        ...previus,
        sId: event.target.value
        }
      }
    )
    }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    let pack = {name: input.name, contact: [input.telefono, input.email], act: inputAct}
    dispatch(createClient(pack))
      .then((res) => {
        alert("Client created");
        history.push("/");
      })
      .catch((err) => {
        alert(`Error on creating user, verify credentials`);
      });
    setInput({
      name: "",
      email: "",
      telefono: ""
    });
    setAct({
      name: "",
      date: "",
      persons:[],
      sId: "",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="md:max-w-6xl md:mx-auto px-4 py-7">
        <div className="flex flex-col items-left justify-between mb-4">
          <h2 className="text-xl font-bold block text-gray-800">Nuevo Cliente</h2>
          <h2 className="text-xs font-bold block text-gray-800">
            (*) Campo requerido
          </h2>
        </div>
        <form
          action="{{ route('profile.save') }}"
          method="POST"
          onSubmit={() => handleSubmit()}
        >
          <div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
            <div className="md:w-2/3 w-full px-2 py-4 justify-center m-auto">
              <h2 className="text-center font-bold text-3xl">New User</h2>
              <div className="p-2 w-2/2 block">
                <label htmlFor="name" className="text-sm text-gray-600">
                  * Nombre
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none "
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
                {/* {error.name && (
                  <span className="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800">
                    {" "}
                    {error.name}
                  </span>
                )} */}
              </div>
              <div className="p-2">
                <label htmlFor="name" className="text-sm text-gray-600">
                  * Email
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none "
                  type="text"
                  value={input.email}
                  name="email"
                  placeholder="example@correo.com"
                  onChange={handleChange}
                />
              </div>
              <div className="p-2">
                <label htmlFor="email" className="text-sm text-gray-600">
                  * Telefono
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none "
                  type="password"
                  value={input.telefono}
                  name="telefono"
                  placeholder="1234567"
                  onChange={handleChange}
                />
              </div>
              <div className="p-2">
                <label htmlFor="email" className="text-sm text-gray-600">
                  * Date
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none "
                  type="date"
                  value={inputAct.date}
                  name="date"
                  placeholder="1234567"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="p-2">
                <label htmlFor="email" className="text-sm text-gray-600">
                  * Personas
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none "
                  type="text"
                  value={inputAct.date}
                  name="persons"
                  placeholder="1234567"
                  onChange={handleChange}
                />
              </div> */}
              <div className="p-2">
                <label
                  htmlFor="services"
                  className="block mb-2  text-gray-600 "
                >
                  * Servicio
                </label>
                <select
                  id="countries"
                  className=" border border-gray-300 text-base  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(event) => handleSelectService(event)}
                  defaultValue=""
                >
                  <option disabled="">Servicios</option>
                  {services &&
                    services.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
                {error.country && (
                  <span className="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800">
                    {error.country}
                  </span>
                )}
              </div>
                <div className="flex flex-col justify-center">
                  <input
                    type="submit"
                    className="bg-blue-500 w-1/2 my-3 mx-auto text-white text-sm font-medium px-6 py-2 rounded uppercase cursor-pointer"
                    value="Create User"
                  />
                </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
