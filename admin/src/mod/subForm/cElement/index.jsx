import React from "react";
import Input from "../cElement/Elementos/input";
import TextArea from "../cElement/Elementos/textArea";
import Select from "../cElement/Elementos/select";
import DataList from "../cElement/Elementos/dataList";

const CElement = (p, vals) => {

  let {fT} = p.p;
  let text = ["input", "textarea"];

  return (
    <div>
        {
            text.includes(fT) ? (fT === "input" ? 
                <Input p={p.fV}/> 
                : 
                <TextArea p={p.fV}/>)
                    :
                    (fT === "select" ?
                     <Select p={p.p.fV} vals={p.vals}/>
                     :
                     <DataList p={p.fV}/>)
        }
    </div>
  );
};

export default CElement;
