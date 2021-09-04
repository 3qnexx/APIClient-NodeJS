"use strict";

const types={
	TITLE:'title',
	SUBTITLE:'subtitle',
	CREATED:'created',
	UPLOADED:'uploaded',
	RELEASEDATE:'releasedate',
	RUNTIME:'runtime',
	FILESIZE:'filesize',
	RANDOM:'random',
	IGPOP:'igpop'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
