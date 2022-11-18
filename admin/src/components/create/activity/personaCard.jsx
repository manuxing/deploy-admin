import React from "react";

const PersonCard = ({ person }) => {
  return (
    <div className="contactcard">
      <h3>{person.ageR}</h3>
      <h3>{person.sexo}</h3>
    </div>
  );
};

export default PersonCard;
