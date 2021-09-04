"use strict";

const types={
	MIXED:"mixed",
	MASTER:"master",
	OWN:"own",
	ALL:"all"
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
