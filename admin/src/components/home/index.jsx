import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActividades, getClient, getReviews, getServicio, getSolicitudes, setAll } from "../../redux/actions";
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
    dispatch(setAll());
    let actions = [getActividades, getClient, getServicio, getSolicitudes, getReviews];
    tools.build(dispatch, actions);
  }, [dispatch]);
  useEffect(() => {
    if(all.stats && Object.keys(all.stats).length === all.display.length){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [all]);

  return (
    <div>
      <NavBar />
      <div className="home">
        <SideBar />
        <div className="content">
        {loading === false ? 
            Object.values(all.stats).map((p) => {
              return <Stat key={p} p={p} />;
            }) :
            <></>
        }
        </div>
      </div>
    </div>
  );
};

export default Home;
