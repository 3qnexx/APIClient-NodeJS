"use strict";

const types={
    JS:'js',
    EMBED:'embed',
    WC:'wc',
    NATIVE:'native'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
