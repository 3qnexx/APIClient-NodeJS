"use strict";

const types={
    WINNER:'winner',
    NOMINEE:'nominee'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
