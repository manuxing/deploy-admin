import React from "react";

const DashDisplay = ( data ) => {
    let back = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGGvDxkPArT8mDgzcziQn30blnyEY_REmrg&usqp=CAU";
    let {Dash, model} = data;
    let all = data.all;
    return (
                <div>
                    { all[0] === 0 ?
                        <span>
                            no se encontraron{model}
                        </span> :
                        all.map(data=>{
                            data.back = back;
                            console.log(data)
                            return(
                                <Dash key={data.id} data={data} />
                            );
                        })
                    }
                </div>
    );
};

export default DashDisplay;