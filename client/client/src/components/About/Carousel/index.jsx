import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./index.css"

const Carousell= ()=> {
  return (
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
}

export default Carousell