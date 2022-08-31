import React from "react";
import { useSelector } from "react-redux";
import reviewC from "../reviewC";
import activityC from "../activityC";

const Cliente = () => {

  let actual = useSelector((state) => state.actual);
  let allClients = useSelector((state) => state.clientes);

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            {actual.name}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Contactos
        </span>
        <div>
              {
              actual.contact.map(p => { 
                return (
                    <span>{p}</span> 
                ) 
              })
              }
        </div>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Actividades realizadas
        </span>
        <div>
              {
              actual.activities.map(p => { 
                return (
                   <activityC id = {actual.id}/>
                ) 
              })
              }
        </div>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Reviews
        </span>
        <div>
              {
                actual.reviews.map(p => { 
                  return (
                  <reviewC review = {p}/>
                ) 
              })
              }
        </div>
      </td>
    </tr>
  );
};

export default Cliente;

