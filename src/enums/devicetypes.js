"use strict";

const types={
	PC:'pc',
	MOBILE:'mobile',
	TABLET:'tablet',
	TV:'tv',
	WATCH:'watch',
	SMART:'smart',
	CAR:'car',
	VR:'vr'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
