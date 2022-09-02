import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { statChange } from "../../redux/actions";

// agregar name de cliente aunque no sea cliente a la solicitud

const Review = () => {

  const dispatch = useDispatch();
  const actual = useSelector((state) => state.actual);
  const [_stat, setStat] = useState(actual.stat);
  const client = actual.clients[0];
  

  const handleChange = () => {
    let x = {
      type : "Review",
      pack: {
        id: actual.id,
        stat: !_stat,
      }
    }
    setStat(!_stat);
    dispatch(statChange(x));
  }

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
       
        <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Cliente
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
          Medio
        </span>
        {actual.thg}
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
          Contacto
        </span>
        <div>
              {
                client.contact.map(p => { 
                  return (
                  <span>{p}</span>
                ) 
              })
              }
        </div>
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
    </tr>
  );
};

export default Review;

