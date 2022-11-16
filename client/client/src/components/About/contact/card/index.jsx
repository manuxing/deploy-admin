import React from 'react'

function ContactCard({contact}) {
  return (
    <div className='contactcard'>
            <span>{contact}</span>
    </div>
  )
}

export default ContactCard;