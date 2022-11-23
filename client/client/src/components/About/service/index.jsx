import React from 'react'
import Carousell from '../Carousel';
import "./index.css"

function ServiceCard({service}) {
  console.log(service)
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
      <div className='containeri'>
          <div className='img'>
              <Carousell serv={service.name.toLowerCase()}/>
          </div>
        </div>
    </div>
  )
}

export default ServiceCard;