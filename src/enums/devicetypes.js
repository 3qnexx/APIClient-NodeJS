"use strict";

const types={
	PC:'desktop',
	MOBILE:'mobile',
	TABLET:'tablet',
	TV:'tv',
	SMART:'smart'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
