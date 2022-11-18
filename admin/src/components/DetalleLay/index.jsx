import React from 'react'
import "./index.css"
import {useSelector} from "react-redux"

function DetalleLay() {
  let actual = useSelector(state => state.actualG);
  let name = actual.model[0].toUpperCase() + actual.model.substring(1)
  return (
    <div className='detailaycard'>
      <div className='titulo'>
        <h2>{name}</h2>
      </div>
      <div className='content'>
        <div>
          <h3>Total</h3>
          <span> {actual.total}</span>
        </div>
        <div>
          <h3>Ultima semana</h3>
          <span>{Math.floor(Math.random() * (actual.total/2))}</span>
        </div>
      </div>
    </div>
  )
}

export default DetalleLay
