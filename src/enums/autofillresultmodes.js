"use strict";

const types={
    RANDOM:'random',
    LATEST:'latest',
    TOPITEMS:'topitems',
    TOPITEMS_EXTERNAL:'topitemsexternal',
    FORKIDS:'forkids',
    evergreens:'evergreens'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
