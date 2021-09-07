"use strict";

const types={
    CELSIUS:'celsius',
    FAHRENHEIT:'fahrenheit'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
