import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActividades, getClient, setActual } from '../../redux/actions'
import NavBar from '../bars/navBar'
import SideBar from '../bars/sideBar'
import Spinner from "../Spinner.jsx"
import Dash from '../Dashes/Client'

const ClientLayout = () => {

    let todas = useSelector(state => state.clientes)
    let dispatch = useDispatch();
    let [cards, setCards] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(getClient())
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
                                console.log(p);
                             return (<Dash 
                                    key = {p.id}
                                    id = {p.id}
                                    back = {p.back ? p.back : 'https://e7.pngegg.com/pngimages/779/957/png-clipart-video-games-video-game-consoles-red-dead-redemption-video-game-developer-cool-gaming-logos-blue-game-logo.png'}
                                    name = {p.name}
                                    contact = {p.contact}
                                    act = {p.activities}
                                    rev = {p.reviews}
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

export default ClientLayout