import React from 'react'
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

const SingUp = ({history})=> {
    const handleSub = async(e)=>{
        e.preventDefault()
        const {email, password} = e.target.elements;
        try {
            await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        }catch(e){
            alert(e.message);
        }
    }
     
  return (
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