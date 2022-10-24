import React from "react";
import NavBar from "../bars/navBar"
import SideBar from "../bars/sideBar"
import "./home.css"

const Home = () => {

    return (
      <div>
        <NavBar/>
        <div className="home">
          <SideBar/>
          <div className="content">
            {<h1>Home</h1>}
          </div>
       </div>
    </div>
    );
  };
  
  export default Home;
  