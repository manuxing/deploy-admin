import React from "react";

const ContactCard = ({ contact }) => {
  console.log(contact)
  return (
    typeof contact === 'object' ?
    <div className="contact_card_createClient">
      <h2>{contact.type}</h2>
      <h2>{contact.value}</h2>
    </div>: 
    <h2>{contact}</h2>
  );
};

export default React.memo(ContactCard);
