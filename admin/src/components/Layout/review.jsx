import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReviews, setActual } from '../../redux/actions'
import NavBar from '../bars/navBar'
import SideBar from '../bars/sideBar'
import Spinner from "../Spinner.jsx"
import Dash from '../Dashes/Review'

const ReviewLayout = () => {

    let todas = useSelector(state => state.reviews)
    let dispatch = useDispatch();
    let [cards, setCards] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(getReviews())
    },[dispatch])

    useEffect(()=>{
        console.log(cards)
        if(todas.length > 0){
            setCards(todas)
        }
        if(cards && cards.length > 0)setLoading(false)
    },[todas,cards])

    useEffect(() => {
        return () => dispatch(setActual())
      }, []);

  return (
        <div>
      <NavBar/>
      <div className="client_l">
        <SideBar/>
        <div className="content_cli_l">
                {loading === false ?
                    <div className="cont">
                        <div className="cards">
                        {
                            cards && cards?.map(p =>{ 
                                console.log("p",p);
                             return (<Dash 
                                    key = {p.id}
                                    id = {p.id}
                                    back = {p.back ? p.back : 'https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png'}
                                    stat = {p.stat}
                                    dateR = {p.dateR}
                                    dateP = {p.dateP}
                                    thg = {p.thg}
                                    clients = {p.clients?.length > 0 ? p.clients?.length : 0}
                                    services = {p.services?.length > 0 ? p.services?.length : 0}
                                    />)
                            }
                                ) 
                            }
                        </div>
                    </div> : 
                    <div>
                        eeeeeeee
                        <Spinner/>
                    </div>
                    }
                </div>
                </div>
                </div>
                )
}

export default ReviewLayout