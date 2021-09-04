"use strict";

const types={
    FACEBOOK:'facebook',
    GOOGLE:'google',
    TWITTER:'twitter',
    AAD:'aad'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
