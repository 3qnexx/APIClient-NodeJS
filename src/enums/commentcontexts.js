"use strict";

const types={
    ALL:'all',
    OWN:'own'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
