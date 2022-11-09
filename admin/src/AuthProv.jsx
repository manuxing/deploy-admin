import React, {useEffect, useState} from 'react'
import firebase from "./firebase.js"

export const AuthContext =  React.createContext(null);
export const AuthProvider = ({ c }) =>{
  const [ currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(setCurrentUser);
  },[]);
  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}>
      {c}
    </AuthContext.Provider>
  )
}

export default AuthProvider;