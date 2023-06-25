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
	CHROMECAST:'chromecast',
	ANDROIDCAR:'androidauto',
	CARPLAY:'carplay',
	PODCAST:'podcast',
	WATCH:'watch',
	VR:'vr',
	XBOX:'xbox',
	PLAYSTATION:'playstation',
	WINDOWS:'windows',
	MACOS:'macos',
	CHROMEOS:'chromeos'
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
