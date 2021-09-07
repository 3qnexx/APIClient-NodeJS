"use strict";

const types={
	DELETE:'delete',
	ARCHIVE:'archive',
	BLOCK:'block',
	NEWVERSION:'newversion'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
