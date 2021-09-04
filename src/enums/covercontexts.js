"use strict";

const types={
	COVER:'cover',
	ALTERNATIVE:'alternative',
	ABTEST:'abtest',
	BANNER:'banner',
	ACTIONSHOT:'actionshot',
	QUAD:'quad',
	FAMILYSAFE:'familysafe'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
