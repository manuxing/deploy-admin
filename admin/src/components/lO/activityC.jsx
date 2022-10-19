import React, { useEffect  } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner';

const ActivityC = ({id}) => {
    const activitys = useSelector((state) => state.actividades);
    const activity = activitys.find(p => p.id === id)
    console.log("actividades",activitys)
    useEffect(()=>{
      console.log("act",activity)
  },[activitys])

  return (
    activity && activity.id ?
    <div>
        <div className="content_actC">
          <div className="item_actC">
            <span className="span_actC">
                fecha de la actividad:
                {activity?.date ? activity?.date : "date"}
            </span>
          </div>
          <div className="item_actC">
            <span className="span_actC">
                Servicio:
                {activity?.service ? activity?.service : "service"} 
            </span>
          </div>
          <div className="item_actC">
            <span className="span_actC">
                Personas:
            </span>
                {activity?.people ? activity?.people.length : "0"}
            <div>
                {activity?.people && activity?.people.length > 0 ?
                  activity?.people.map(p => { 
                    return (
                    <div key={p.id}>
                        <span>{p.sex}</span> 
                        <span>{p.ageR}</span> 
                    </div>
                    ) 
                  }) : <span>people</span> 
                }
            </div>
          </div>
        </div>
      </div>:
      <div>
        <Spinner/>
      </div>
  );
};

export default ActivityC;