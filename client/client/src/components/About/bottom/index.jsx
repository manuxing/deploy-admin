import React from 'react'
import Contactos from '../contact'
import "./index.css"
import Map from './maps'

function Bottom({contact}) {
  return (
    <div className='bottom'>
            <Map/>
            <Contactos  contact={contact}/>
    </div>
  )
}

export default Bottom