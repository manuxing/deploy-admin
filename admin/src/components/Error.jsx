import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { error } from '../redux/actions/index'

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
                    {
                        <span>
                            {err.data}      
                        </span>
                    }
                </div>
    );
};

export default Error;
