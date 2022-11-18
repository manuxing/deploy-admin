import React from 'react'

function ContactCard({contact}) {
  return (
    contact.type === "url" ?
    <div className='contactcard'>
            <a href={contact.value} target="_blank" rel="noopener noreferrer">{contact.a}</a>
    </div>
    :
    <div className='contactcard'>
            <span>{contact.type}: </span>
            <span> {contact.value}</span>
    </div>
  )
}

export default ContactCard;