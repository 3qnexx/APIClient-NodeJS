"use strict";

const types={
	CLASSIC:"classic",
	WEBP:"webp",
	AVIF:"avif"
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
