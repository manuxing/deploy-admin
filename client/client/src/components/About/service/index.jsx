import React from 'react'
import Carousell from '../Carousel';
import "./index.css"

function ServiceCard({service}) {
  return (
    <div className='servicecard'>
      <div className='servi'>
        <div className='servicen'>
            <h3>{service.name}</h3>
        </div>
        <div className='serviced'>
            <span>{service.description}</span>
        </div>
      </div>
        <div className='img'>
            <Carousell/>
        </div>
    </div>
  )
}

export default ServiceCard;