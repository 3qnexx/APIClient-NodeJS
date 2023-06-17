"use strict";

const modes={
	RANDOM:'random',
	LATEST:'latest',
	TOPITEMS:'topitems',
	TOPITEMS_EXTERNAL:'topitemsexternal',
	FORKIDS:'forkids',
	EVERGREENS:'evergreens'
}
function getAllTypes(){
	return(Object.values(modes));
}

module.exports=modes;
module.exports.getAllTypes=getAllTypes;

