import React from "react";
import { useSelector } from "react-redux";

const ActivityC = ({id}) => {

    // buscar actividades porque no van a venir enteras
    const activitys = useSelector((state) => state.actividades);
    const activity = activitys.find(p => p.clientId === id)

  return (
    <div>
        <div className="content_actC">
          <div className="item_actC">
            <span className="span_actC">
                fecha de la actividad:
                {activity.date}
            </span>
          </div>
          <div className="item_actC">
            <span className="span_actC">
                Servicio:
                {activity.service}
            </span>
          </div>
          <div className="item_actC">
            <span className="span_actC">
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
          </div>
        </div>
      </div>
  );
};

export default ActivityC;