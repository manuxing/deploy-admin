import React from 'react'
import "./index.css"

function DetalleLay() {
  return (
    <div className='detailaycard'>
      <div className='titulo'>
        <h2>Activitys</h2>
      </div>
      <div className='content'>
        <div>
          <h3>total</h3>
          <span> 3</span>
        </div>
        <div>
          <h3>ultima semana</h3>
          <span> 1</span>
        </div>
        {/* <div>
          <h3>servicio mas popular</h3>
          <span> servicio</span>
        </div> */}
      </div>
    </div>
  )
}

export default DetalleLay
