import React from "react";

const PersonCard = ({ person }) => {
  return (
    <div className="contact_card_createClient">
      <h2>{person.ageR}</h2>
      <h2>{person.sexo}</h2>
    </div>
  );
};

export default PersonCard;
