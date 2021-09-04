"use strict";

const types={
    OWN:'own',
    REMOTE:'remote'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
