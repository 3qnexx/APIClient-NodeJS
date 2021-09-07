"use strict";

const types={
    BYUSER:'byuser',
    INCMS:'incms',
    INAPPAPI:'inappapi',
    RECHARGEPROBLEM:'rechargeproblem',
    PAYMENTCANCELED:'paymentcanceled'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
