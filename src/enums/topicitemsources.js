"use strict";

const types={
	TOPITEMS:"topitems",
	TOPITEMSEXTERNAL:"topitemsexternal",
	MOSTLIKED:"mostliked",
	MOSTCOMMENDED:"mostcommented",
	BESTRATED:"bestrated",
	MOSTACTIVE:"mostactive",
	PICKED:"picked"
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
