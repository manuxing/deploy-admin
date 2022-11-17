import React from "react";
import "./About.css"

const ServiceCard = ({service}) => {
  return (
    <div className="contactcard_ab">
      <span>{service.name}</span>
    </div>
  );
};

export default React.memo(ServiceCard);