import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAll } from "../../redux/actions";
import NavBar from "../bars/navBar";
import SideBar from "../bars/sideBar";
import Stat from "../stats/Activity.jsx";
import "./home.css";

const Home = () => {
  let all = useSelector((state) => state.all.stats);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAll());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className="home">
        <SideBar />
        <div className="content">
          {all?.stats &&
            all.stats.map((p) => {
              return <Stat obj={p} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
