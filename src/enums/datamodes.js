"use strict";

const types={
    API:'api',
    STATIC:'static',
    OFFLINE:'offline'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
