"use strict";

const types={
    METRIC:'metric',
    IMPERIAL:'imperial'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
