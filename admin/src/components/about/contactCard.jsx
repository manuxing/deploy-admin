import React from "react";
import "./About.css"

const ContactCard = ({ contact }) => {
  console.log(   typeof contact === 'object')
  return (
    typeof contact === 'object' ?
    <div className="contactcard_ab">
      <span>{contact.type}: {contact.value}</span>
    </div>: 
    <div className="contactcard_ab">
      <span>{contact}</span>
    </div>
  );
};

export default React.memo(ContactCard);
