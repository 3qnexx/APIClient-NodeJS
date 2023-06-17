"use strict";

const scales={
	DAY:'day',
	HOUR:'hour',
	WEEKDAY:'weekday'
};

function getAllTypes(){
    return(Object.values(scales));
}

module.exports=scales;
module.exports.getAllTypes=getAllTypes;
