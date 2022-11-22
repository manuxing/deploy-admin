import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import cabimag1 from "../../asserts/cabañas/1.jpg"
import cabimag2 from "../../asserts/cabañas/2.jpg"
import cabimag3 from "../../asserts/cabañas/3.jpg"
import cabimag4 from "../../asserts/cabañas/4.jpg"
import recimag1 from "../../asserts/recorrido/1.jpg"
import recimag2 from "../../asserts/recorrido/2.jpg"
import recimag3 from "../../asserts/recorrido/3.jpg"
import caimag1 from "../../asserts/cavas/1.jpg"
import caimag2 from "../../asserts/cavas/2.jpg"
import "./index.css"

const Carousell= ({serv})=> {
  console.log(serv)
  return ( serv === "cabañas" ?
            <Carousel  className='caroulsel'>
                <div>
                <img src={cabimag1} alt="foto info"/>
                </div>
                <div>
                <img src={cabimag2} alt="foto info"/>
                </div>
                <div>
                <img src={cabimag3} alt="foto info"/>
                </div>
                <div>
                <img src={cabimag4} alt="foto info"/>
                </div>
            </Carousel> 
            :
            ( serv === "recorrido" ?
              <Carousel  className='caroulsel'>
                  <div>
                  <img src={recimag1} alt="foto info"/>
                  </div>
                  <div>
                  <img src={recimag2} alt="foto info"/>
                  </div>
                  <div>
                  <img src={recimag3} alt="foto info"/>
                  </div>
              </Carousel> 
              : 
              ( serv === "cata de vinos" ?
                <Carousel  className='caroulsel'>
                    <div>
                    <img src={caimag1}alt="foto info"/>
                    </div>
                    <div>
                    <img src={caimag2} alt="foto info"/>
                    </div>
                </Carousel> 
                :
                <Carousel  className='caroulsel'>
                    <div>
                    <img src='https://trevelin.tur.ar/wp-content/uploads/2020/08/IMG_3278-1240x930.jpg' alt="foto info"/>
                    </div>
                    <div>
                    <img src='https://trevelin.tur.ar/wp-content/uploads/2020/08/IMG_3278-1240x930.jpg' alt="foto info"/>
                    </div>
                    <div>
                    <img src='https://trevelin.tur.ar/wp-content/uploads/2020/08/IMG_3278-1240x930.jpg' alt="foto info"/>
                    </div>
                </Carousel> 
              )
            )
  )
}

export default Carousell