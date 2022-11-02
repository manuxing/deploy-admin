import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom"
import { error } from '../redux/actions/index'

const Error = ( ) => {

    let dispatch = useDispatch();
    let history = useHistory();
    let err = useSelector(state => state.error);
    
    useEffect(() => {
        if(!err){
            history.goBack();
        }
    }, [err]);

    useEffect(() => {
        return () => {
            dispatch(error());
            history.goBack();
        }
    }, []);

    return (
                <div>
                    {err&&
                        <span>
                            {err?.data}      
                        </span>
                    }
                    <Link
                        to="/">
                      home
                    </Link>
                </div>
    );
};

export default Error;
