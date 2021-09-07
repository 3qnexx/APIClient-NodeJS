"use strict";

const types={
    NONE:'none',
    ONLYSTRING:'onlystring',
    V1:'1',
    V2:'2'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
