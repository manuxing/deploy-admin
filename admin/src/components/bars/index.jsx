import React from "react";
import ActivitysGraph from "../Graphs/ActivitysGraph";
import NavBar from "./navBar";
import SideBar from "./sideBar";

const Bars = () => {
  return (
    <div className="bars">
        <NavBar/>
            <SideBar/>
     </div>
  );
};

export default React.memo(Bars);
