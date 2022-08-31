import React from "react";
import { useSelector } from "react-redux";
// agregar name de cliente aunque no sea cliente a la solicitud

const Review = () => {

  let actual = useSelector((state) => state.actual);
  let allReviews = useSelector((state) => state.reviews);

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
        <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Cliente
        </span>
              {actual.clients[0].name}
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
          Medio
        </span>
              {actual.thg}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          fecha de actividad
          </span>
              {actual.dateR}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          fecha de reseña
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

export default Review;

