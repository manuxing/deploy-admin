import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import reviewC from "../../lO/reviewC"
import activityC from "../../lO/activityC"
import "./client.css"

const Cliente = () => {

  let actual = useSelector((state) => state.actual);
  let allClients = useSelector((state) => state.clientes);

  return (
    <div>
      <NavBar/>
      <div className="client_d">
        <SideBar/>
        <div className="content_cli">
          <div className="div_cli">
            <span className="span_cli">
                {actual?.name ? actual?.name : "name"}
            </span>
          </div>
          <div className="div_cli">
            <span className="span_cli">
              Contactos
            </span>
            <div>
                  {
                  actual?.contact ? actual?.contact.map(p => { 
                    return (
                        <span>{p}</span> 
                    ) 
                  }) : "contacto"
                  }
            </div>
          </div>
          <div className="div_cli">
          <span className="span_cli">
              Actividades realizadas
            </span>
            <div>
                  {
                  actual?.activities ? actual?.activities.map(p => { 
                    return (
                      <activityC id = {actual.id}/>
                    ) 
                  }) : "actividades realizadas"
                  }
            </div>
          </div>
          <div className="div_cli">
            <span className="span_cli">
              Reviews
            </span>
            <div>
                  {
                    actual?.reviews ? actual?.reviews.map(p => { 
                      return (
                      <reviewC review = {p}/>
                    ) 
                  }) : "Reviews"
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cliente;

