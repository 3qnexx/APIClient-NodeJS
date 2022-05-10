"use strict";

const types={
	PC:'desktop',
	MOBILE:'mobile',
	TABLET:'tablet',
	CAR:'car',
	AMP:'amp',
	FBIA:'fbia',
	IOS:'ios',
	ANDROID:'android',
	SMARTTV:'smarttv',
	ANDROIDTV:'androidtv',
	ANDROIDCAR:'androidcar',
	podcast:'podcast'
};

function getAllTypes(){
    return(Object.values(types));
}

function getMediaGateways(){
    return([types.PC,types.MOBILE,types.SMARTTV]);
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
module.exports.getMediaGateways=getMediaGateways;
