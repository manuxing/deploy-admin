import React from 'react'
import firebase from "../../firebase";

const LogOut =()=>{
  const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  return <button onClick={(e) => handleClick(e)}>LogOut</button>;
}

export default LogOut