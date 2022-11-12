import React from "react";
import "./About.css"

const ContactCard = ({ contact }) => {
  console.log(contact)
  return (
    typeof contact === 'object' ?
    <div className="contactcard">
      <h3>{contact.type}: {contact.value}</h3>
    </div>: 
    <div className="contactcard">
      <h3>{contact}</h3>
    </div>
  );
};

export default React.memo(ContactCard);
