import React from "react";

const ActivityC = ({ activity }) => {

  return activity && activity.id && (
    <div>
      <div className="content_actC">
        <div className="item_actC">
          <span className="span_actC">
            {activity?.date ? activity?.date : "date"}
          </span>
        </div>
        <div className="item_actC">
          <span className="span_actC">
            {activity?.service ? activity?.service : "service"}
          </span>
        </div>
      </div>
    </div>
  ) 
};

export default React.memo(ActivityC);
