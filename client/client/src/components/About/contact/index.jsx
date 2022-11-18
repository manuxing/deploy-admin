import React from 'react'
import ContactCard from './card';
import "./index.css"

function Contactos({contact}) {
  return (
    <div className='contactos'>
        {contact.map((p) => {
        return (
            <ContactCard contact={p}/>
        );
        })}
    </div> 
  )
}

export default Contactos;