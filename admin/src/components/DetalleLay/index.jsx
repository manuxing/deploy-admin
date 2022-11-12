import React from 'react'
import "./index.css"

function DetalleLay() {
  return (
    <div className='detailaycard'>
      <div className='titulo'>
        <h1>Activitys</h1>
      </div>
      <div className='content'>
        <div>
          <h2>total</h2>
          <span> 3</span>
        </div>
        <div>
          <h2>ultima semana</h2>
          <span> 1</span>
        </div>
        <div>
          <h2>servicio mas popular</h2>
          <span> servicio</span>
        </div>
      </div>
    </div>
  )
}

export default DetalleLay
