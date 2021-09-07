"use strict";

const types={
	PUBLIC:"public",
	UNLISTED:"unlisted",
	PRIVATE:"private"
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
