import React, { useEffect, useState } from "react";

const ContactCard = ({ contact }) => {
  let [solo, setSolo] = useState(false);
  useEffect(() => {
    if (contact.type === contact.value) {
      setSolo(true);
    }
  }, [solo, contact]);
  return solo === false ? (
    <div className="contact_card_createClient">
      <h2>{contact.type}</h2>
      <h2>{contact.value}</h2>
    </div>
  ) : (
    <div className="contact_card_createClient">
      <h2>{contact.type}</h2>
    </div>
  );
};

export default ContactCard;
