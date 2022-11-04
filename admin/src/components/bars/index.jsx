import React from "react";
import NavBar from "./navBar";
import SideBar from "./sideBar";

const Bars = () => {
  return (
    <div>
        <NavBar/>
        <div>
            <SideBar/>
        </div>
    </div>
  );
};

export default React.memo(Bars);
