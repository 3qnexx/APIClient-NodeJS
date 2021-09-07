"use strict";

const types={
	GEO:'geo',
	ZIPCODE:'zipcode',
	PLACE:'place'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
