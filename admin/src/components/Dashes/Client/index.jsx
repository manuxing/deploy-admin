import React from "react";
import './Client.css';
import "../../Layout/base.css"
import { NavLink } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Dash = ({data, handleClick})=> { 
    let { id,  name, contact } = data;
    return (
        id === undefined ? <></> :
        <div className="dash">
                    <div className="topdash">
                        <AccountBoxIcon/>
                    </div>
                <NavLink className="dashdata" to={`/client/${id}`}>
                        <div >
                            <h2>
                                {name}
                            </h2>
                        </div>
                            {contact && contact.length > 0 &&
                                contact.map(p =>{
                                    return(
                                        <div  key={p}>
                                            <h3 > {p} </h3>
                                        </div>
                                    )
                                })
                            }
                </NavLink>
                <div className="delete">
                    <button onClick={(e)=> handleClick(e, id)}>borrar</button>
                </div>
        </div>
    )
};

export default React.memo(Dash);