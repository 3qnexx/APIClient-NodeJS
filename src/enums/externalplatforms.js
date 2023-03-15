"use strict";

const types={
	FACEBOOK:'facebook',
	INSTAGRAM:'instagram',
	TWITTER:'twitter',
	VIMEO:'vimeo',
	YOUTUBE:'youtube',
	TIKTOK:'tiktok',
	LINKEDIN:'linkedin',
	MASTODON:'mastodon',
	EXTERNALVIEW:'externalview'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
