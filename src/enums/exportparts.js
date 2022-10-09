"use strict";

const types={
	ALL:"all",
	METADATA:"metadata",
	TEXTTRACKS:"texttracks",
	COVER:"cover",
	VIDEO:"video"
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
