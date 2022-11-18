import React from "react";

const ContactCard = ({ contact }) => {
  return (
    <div className="contact_card_createClient">
      <h3>{contact.type}</h3>
      {contact.type !== contact.value ? 
      <h3>{contact.value}</h3>:
      <></>}
    </div>
  );
};

export default ContactCard;
