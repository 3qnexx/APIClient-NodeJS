"use strict";

const types={
	RTMP:'rtmp',
	SRT:'srt'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
