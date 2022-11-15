import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import Spinner from '../components/Spinner';
import firebase from '../firebase';
import tools from '../tools';
import "./singup.css"

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
                <div className='page'>
            <form onSubmit={handleSub}>
                    <div className='singup'>
                        <div className='nodesu'>
                            <h3> Email</h3>
                        <input name="email" type={"email"} placeholder="email"/>
                        <div className='warning'>{warning.email}</div>
                        </div>
                        <div className='nodesu'>
                            <h3> password</h3>
                            <input name="password" type={"password"} placeholder="password"/>
                            <div className='warnig'>{warning.password}</div>
                        </div>
                    <div className='entrar'>
                        <button type="submit">
                            Entrar
                        </button>
                    </div>
                    <div className='warning'>{warning.gral}</div>
                        </div>
            </form>
                </div>
    )
}

export default withRouter(SingUp);