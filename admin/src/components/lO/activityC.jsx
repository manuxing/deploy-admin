import React from "react";

const ActivityC = ({ activity }) => {

  return activity && activity.id && (
    <div>
      <div className="content_actC">
        <div className="item_actC">
          <span className="span_actC">
            fecha de la actividad:
            {activity?.date ? activity?.date : "date"}
          </span>
        </div>
        <div className="item_actC">
          <span className="span_actC">
            Servicio:
            {activity?.service ? activity?.service : "service"}
          </span>
        </div>
        <div className="item_actC">
          <span className="span_actC">Participantes:</span>
          {activity?.people ? activity?.people.length : "0"}
        </div>
      </div>
    </div>
  ) 
};

export default React.memo(ActivityC);
