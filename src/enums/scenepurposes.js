"use strict";

const types={
	CHAPTER:'chapter',
	OPENING:'opening',
	RECAP:'recap',
	CREDITS:'credits'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
