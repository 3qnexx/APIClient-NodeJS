"use strict";

const types={
    HD:'hd',
    FULLHD:'fullhd',
    TWOK:'2k',
    FOURK:'4k'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
