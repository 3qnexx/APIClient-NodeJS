"use strict";

const types={
    FACEBOOK:'facebook',
    GOOGLE:'google',
    APPLE:'apple',
    AAD:'aad'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
