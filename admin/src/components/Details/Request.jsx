import React from "react";
import { useSelector } from "react-redux";
// agregar name de cliente aunque no sea cliente a la solicitud
//cambiar estado

const Request = () => {

  let actual = useSelector((state) => state.actual);
  let allRequests = useSelector((state) => state.solicitudes);

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
        <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Solicitante
        </span>
              {actual.name}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Tipo
        </span>
              {actual.ant === false ? "Solcitada" : "Espontanea"}
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
          Medio
        </span>
              {actual.thg}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          fecha de solicitud
          </span>
              {actual.dateR}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          fecha solicitada
          </span>
              {actual.dateP}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Estado
          </span>
              {actual.stat}
      </td>
    </tr>
  );
};

export default Request;

