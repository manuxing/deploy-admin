import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getReviews, statChange, setActual, getClient } from "../../../redux/actions";
import Spinner from '../../Spinner'
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./review.css"


const Review = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const actual = useSelector((state) => state.actual);
  const [_stat, setStat] = useState(false);
  let [loading, setLoading] = useState(true);

    useEffect(()=>{
      dispatch(getReviews(id))
    },[dispatch])
    
    useEffect(()=>{
      if(actual && actual !== 1 && actual?.stat !== null){
        setStat(actual?.stat)
        setLoading(false)
      }else{
        setLoading(true)
      }
      console.log("act",actual)
    },[loading,actual])

    useEffect(() => {
      return () => dispatch(setActual())
    }, []);

  const handleChange = () => {  
    let x = {
      type : "Review",
      pack: {
        id: parseInt(id),
        stat: !_stat,
      }
    }
    console.log("x",x)
    setStat(!_stat);
    dispatch(statChange(x));
  }
  
  return (
    loading === true ?
    <div>
      <Spinner/>
    </div> :
    <div>
      <NavBar/>
      <div className="review_d">
        <SideBar/>
        <div className="content_Review">
          {actual && actual.clients && actual.clients.length > 0 ?
          <div  className="div_rev">
            <span className="span_rev">
              Cliente
            </span>
                <NavLink  className="link" to={`/client/${actual?.clients[0].id}`}>
                  {actual?.clients[0].name ? actual?.clients[0].name : "name"}
                </NavLink>
          </div> : <></>}
          <div  className="div_rev">
            <span className="span_rev">
              Descripcion
            </span>
                  {actual?.description ? actual?.description : "description"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
                Servicios
            </span>
            <div>
                  {
                    actual?.services ? actual?.services.map(p => { 
                      return (
                      <NavLink  className="link" to={`/service/${p.id}`}>
                        <span key={p.name}>{p.name}</span>
                      </NavLink>
                    ) 
                  }) : "services"
                  }
            </div>
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              Medio
            </span>
            {actual?.thg ? actual?.thg : "medio"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              Contacto
            </span>
            <div>
                  {
                    actual.client?.contact ? actual.client?.contact.map(p => { 
                      return (
                      <span>{p}</span>
                      ) 
                  }) : "contacto"
                  }
            </div>
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              fecha de actividad
              </span>
                  {actual?.dateR ? actual?.dateR : "fecha de actividad"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              fecha de reseña
              </span>
                  {actual?.dateP ? actual.dateP : "fecha de reseña"}
          </div>
          <div className="item_requestD">
            <span className="span_request">
              Estado:
                {_stat === true ? "Leida" : "Por ver"}
            </span>
              <button onClick={() => handleChange()}>change</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

