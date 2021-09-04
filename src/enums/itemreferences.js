"use strict";

const types={
    ID:'ID',
    GID:'GID',
    HASH:'hash',
    REFNR:'refnr',
    EXTERNALREFERENCE:'externalReference'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
