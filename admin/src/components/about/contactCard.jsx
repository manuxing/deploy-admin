import React from "react";
import "./About.css"

const ContactCard = ({ contact }) => {
  return (
      <div className="contactcard_ab">
        <span>{contact.type}</span>
      </div>
    );
};

export default React.memo(ContactCard);
