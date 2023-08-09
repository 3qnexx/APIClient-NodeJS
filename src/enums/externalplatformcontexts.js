"use strict";

const types={
	DEFAULT:'default',
	REEL:'reel',
	SHORT:'short',
	STORY:'story'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
