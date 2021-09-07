"use strict";

const types={
    ONLYFIRST:'onlyfirst',
    AFTERFIRST:'afterfirst'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
