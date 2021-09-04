"use strict";

const types={
    FULL:'full',
    DEFAULT:'default',
    ID:'ID',
    GID:'GID'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
