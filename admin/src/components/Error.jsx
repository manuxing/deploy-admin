import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { error } from '../redux/actions/index'
import NavBar from "./bars/navBar";
import SideBar from "./bars/sideBar";

const Error = ( ) => {

    let dispatch = useDispatch();
    let history = useHistory();
    let err = useSelector(state => state.error);
    
    useEffect(() => {
        if(err === 0){
            history.goBack();
        }
    }, [err]);

    useEffect(() => {
        return () => {
            dispatch(error());
            history.goBack();
        }
    }, []);


    console.log(err.data, err.status);
    return (
        <div>
            <NavBar/>
            <div className="request_d">
                <SideBar/>
                <div>
                    {
                        <span>
                            {err.data}      
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Error;
