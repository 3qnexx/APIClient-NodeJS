"use strict";

const types={
    FULLTEXT:'fulltext',
    CLASSIC_AND:'classicwithand',
    CLASSIC_OR:'classicwithor'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
