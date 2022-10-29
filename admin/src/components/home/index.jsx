import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, getActividades, getClient, getReviews, getServicio, getSolicitudes, setAll } from "../../redux/actions";
import NavBar from "../bars/navBar";
import SideBar from "../bars/sideBar";
import Stat from "../stats/Activity.jsx";
import tools from "../../tools";
import "./home.css";

const Home = () => {
  let all = useSelector((state) => state.all);
  let [loading, setLoading] = useState(true);

  let dispatch = useDispatch();

  useEffect(() => {
    let actions = [getActividades, getClient, getServicio, getSolicitudes, getReviews];
    if (all.display.length === 0){
      dispatch(setAll());
    }
    tools.build(dispatch, actions);
  }, [dispatch]);
  
  useEffect(() => {
    if(all.stats && all.stats.length === all.display.length){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [all]);

  useEffect(() => {
    return () => dispatch(clearAll())
  }, []);

  return (
    <div>
      <NavBar />
      <div className="home">
        <SideBar />
        <div className="content">
        {loading === false ? 
            all?.stats.map((p) => {
              return <Stat key={p.url} p={p} />;
            }) :
            <></>
        }
        </div>
      </div>
    </div>
  );
};

export default Home;
