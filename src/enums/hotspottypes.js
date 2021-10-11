"use strict";

const types={
    TEXT:'text',
    LINK:'link',
    INTERSTITIAL:'interstitial',
    VIDEO:'video',
    BANNER:'banner',
    SEEK:'seek'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
