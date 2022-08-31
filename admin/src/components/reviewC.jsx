import React from "react";

const reviewC = ({review}) => {

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
        <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de reseña:
            {review.dateR}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de la visita:
            {review.dateP}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Estado:
            {review.stat === true ? "Leida" : "Por ver"}
        </span>
        {/* hacer coso para cambiar el estado desde aca */}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Descripcion:
            {review.description}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Medio:
            {review.thg}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de visita:
            {review.dateP}
        </span>
      </td>
    </tr>
  );
};

export default reviewC;