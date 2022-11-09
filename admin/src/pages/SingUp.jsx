import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Spinner from '../components/SpinnerApp';
import firebase from '../firebase';

const SingUp = ({history})=> {
    let currentUser = useSelector(state => state.currentUser);
    let [loading, setLoading] = useState(true);
    const handleSub = async(e)=>{
        e.preventDefault()
        const {email, password} = e.target.elements;
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            console.log("user:.", user);
            history.push("/home");
        }catch(e){
            console.log(e)
            alert("e.message:e.message", e);
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
          setLoading(false);
        }, 900)
      },[])

    if(currentUser){
        return <Redirect to={"/home"}/>
    }

    return (
        loading === true ? 
        <Spinner/>:
        <div>
            <form onSubmit={handleSub}>
            <label> Email</label>
            <input name="email" type={"email"} placeholder="name"/>
            <label> password</label>
            <input name="password" type={"password"} placeholder="password"/>
            <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default withRouter(SingUp);