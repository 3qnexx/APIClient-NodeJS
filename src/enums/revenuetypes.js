"use strict";

const types={
    SUBSCRIPTION:'subscription',
    REBILL:'rebill',
    PPV:'ppv',
    OWNAGE:'ownage',
    DEPOSIT:'deposit'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
