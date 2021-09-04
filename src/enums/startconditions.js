"use strict";

const types={
    AUTOPLAY:'autoplay',
    MANUAL:'manual',
    AUTOPLAYMUTED:'autoplaymuted',
    MANUALMUTED:'manualmuted'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
