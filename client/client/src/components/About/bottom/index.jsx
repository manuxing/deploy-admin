import React from 'react'
import Contactos from '../contact'
import "./index.css"

function Bottom({contact}) {
  return (
    <div className='bottom'>
            <Contactos  contact={contact}/>
    </div>
  )
}

export default Bottom