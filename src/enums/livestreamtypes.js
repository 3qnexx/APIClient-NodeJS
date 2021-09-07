"use strict";

const types={
	EVENT:"event",
	PERMANENT:"247"
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
