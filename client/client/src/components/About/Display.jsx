import React, { useContext } from 'react'
import { actuallContext } from '../ActualContext';

const Display = ()=> {
    let about = useContext(actuallContext);
  return (
    <div>
      <div>
        <h2>Sobre Nosotros</h2>
        <p>{about.info}</p>
      </div>
      <div>
        {about.contact.map((p) => {
          return (
            <div >
              {p}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Display;