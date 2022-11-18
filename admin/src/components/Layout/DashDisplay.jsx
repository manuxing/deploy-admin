import React from "react";
import "./Layout.css"

const DashDisplay = ( data ) => {
    let {Dash, model, handleClick} = data;
    let all = data.all;
    return (
                <section className="basic-grid">
                    { all[0] === 0 ?
                        <span>
                            no se encontraron {model}
                        </span> :
                        all.map(data=>{
                            return(
                                <Dash key={data.id} data={data} handleClick={handleClick} />
                            );
                        })
                    }
                </section>
    );
};

export default React.memo(DashDisplay);