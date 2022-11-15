import React from "react";

const ActivityC = ({ activity }) => {

  return activity && activity.id && (
    <div className="content_rewC">
    <div className="div_rewC">
      <div >
            {activity?.service ? activity?.service : "service"}
        </div>
          <span>
            {activity?.date ? activity?.date : "date"}
          </span><br></br>
      </div>
    </div>
  ) 
};

export default React.memo(ActivityC);
