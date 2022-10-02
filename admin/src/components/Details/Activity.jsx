import React from "react";
import { useSelector } from "react-redux";
// ver como asociar cliente

const Activity = () => {

  let actual = useSelector((state) => state.actual);
  let allClients = useSelector((state) => state.clientes);
  let client = allClients.find (p => p.id = actual.clientId);

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
        <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Cliente:
        </span>
              {client.name}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Descripcion
        </span>
              {actual.description}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Servicios
        </span>
        <div>
              {
                actual.services.map(p => { 
                  return (
                  <span>{p.name}</span>
                ) 
              })
              }
        </div>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          fecha de actividad
          </span>
              {actual.date}
      </td>
      <td className="border-t">
      <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Personas:
        </span>
            {actual.persons.length}
            <div>
              {
              actual.persons.map(p => { 
                return (
                <>
                    <span>{p.sex}</span> 
                    <span>{p.ageR}</span> 
                </>
                ) 
              })
              }
        </div>
        </td>
    </tr>
  );
};

export default Activity;

