import React from "react";

const ContactCard = ({ contact }) => {
  return (
    <div className="contact_card_createClient">
      <h2>{contact.type}</h2>
      <h2>{contact.value}</h2>
    </div>
  );
};

export default ContactCard;
