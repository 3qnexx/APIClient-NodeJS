"use strict";

const types={
	VIDEO:'video',
	VARIANT:'variant',
	TRAILER:'trailer',
	BONUS:'bonus'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
