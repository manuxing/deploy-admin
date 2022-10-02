import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./Activity_d.css"

const Activity = () => {

  let actual = useSelector((state) => state.actual);
  let allClients = useSelector((state) => state.clientes);
  let client = allClients.find (p => p.id = actual.clientId);

  return (
    <div>
      <NavBar/>
      <div className="Activity_d">
        <SideBar/>
        <div className="content_act">
          <div  className="div_act">
            <span className="_span_act">
              Cliente:
            </span>
                  {client?.name ? client?.name : "name"}
          </div>
          <div  className="div_act">
            <span className="_span_act">
              Descripcion
            </span>
                  {actual?.description ? actual.description: "description"}
          </div>
          <div  className="div_act">
            <span className="_span_act">
                Servicios
            </span>
            <div>
                  {
                    actual?.services ? actual.services.map(p => { 
                      return (
                      <span>{p.name}</span>
                    ) 
                  }) : "services"
                  }
            </div>
          </div>  
          <div  className="div_act">
            <span className="_span_act">
              fecha de actividad
              </span>
                  {actual?.date ? actual?.date : "date"}
          </div>
          <div  className="div_act">
            <span className="_span_act">
                Personas:
            </span>
                {actual?.persons ? actual?.persons.length : "0"}
                <div>
                  {
                  actual?.persons ? actual?.persons.map(p => { 
                    return (
                    <>
                        <span>{p.sex}</span> 
                        <span>{p.ageR}</span> 
                    </>
                    ) 
                  }) : "persons"
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;

