"use strict";

const types={
    ON:'on',
    PAUSE:'pause'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
