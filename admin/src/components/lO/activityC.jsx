import React from "react";
import { useSelector } from "react-redux";

const ActivityC = ({id}) => {

    // buscar actividades porque no van a venir enteras
    const activitys = useSelector((state) => state.actividades);
    const activity = activitys.find(p => p.clientId === id)

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
        <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de la actividad:
            {activity.date}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Servicio:
            {activity.service}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Personas:
        </span>
            {activity.persons.length}
            <div>
              {
              activity.map(p => { 
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

export default ActivityC;