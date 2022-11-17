import React, { useContext } from 'react'
import { actuallContext } from '../ActualContext';
import ServiceCard from './service';
import "./display.css"
import Bottom from './bottom';

const Display = ()=> {
    let about = useContext(actuallContext);
  return (
    <div className="about">
      <div className="title-cont">
        <div className="title">
          {/* foto fondo */}
          <h2>Bodega Romano Pin</h2>
        </div>
      </div>
      <div className='barra'>
        <div className='point'></div>
        <div className='point'></div>
        <div className='point'></div>
        
      </div>
      <div className='infocont'>
        <div className='info'>
          <p>{about.info}</p>
        </div>
      </div>
      <div className='services'>
        {JSON.parse(about.servicios).map((p) => {
          return (
            <ServiceCard service={p}/>
          );
        })}
      </div>
      <div className='barras'>
      <div className='points'></div>
        <div className='points'></div>
        <div className='points'></div>
      </div>
      <Bottom contact={JSON.parse(about.contact)}/>
    </div>
  );
}

export default Display;