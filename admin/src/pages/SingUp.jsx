import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import Spinner from '../components/SpinnerApp';
import firebase from '../firebase';
import tools from '../tools';

const SingUp = ()=> {
    let currentUser = useSelector(state => state.currentUser);
    let history = useHistory();
    let [loading, setLoading] = useState(true);
    let [warning, setWarning] = useState({email: "", password:"", gral: ""});

    const handleSub = async(e)=>{
        e.preventDefault()

        let {email, password} = e.target.elements;
        [email, password] = [email.value, password.value];
        let valid = tools.validate.login({email, password});

        valid.status === false ?  errHan(valid)
        : sub({email, password})
    }

    let sub = async(user)=>{
        try {
            setLoading(true);
            console.log(user)
            await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            history.push("/home");
        }catch(e){
            console.log(e)
            alert("e.message:e.message", e);
            setLoading(false);
        }
    }

    let errHan = (err)=>{
        let copy = warning;
        err.err.forEach((p) => copy = { ...copy, [p.ubic]: p.message });
        setWarning(copy);
    }

    let unMount = (err)=>{
        setWarning({email: "", password:"", gral: ""});
    }

    useEffect(()=>{
        setTimeout(()=>{
          setLoading(false);
        }, 900)
        return ()=>unMount();
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
            <input name="email" type={"email"} placeholder="email"/>
            <div>{warning.email}</div>
            <label> password</label>
            <input name="password" type={"password"} placeholder="password"/>
            <div>{warning.password}</div>
            <button type="submit">submit</button>
            </form>
            <div>{warning.gral}</div>
        </div>
    )
}

export default withRouter(SingUp);