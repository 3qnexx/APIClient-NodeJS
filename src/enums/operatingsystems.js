"use strict";

const types={
    WINDOWS:'windows',
    MACOS:'macos',
    LINUX:'linux',
    IOS:'ios',
    ANDROID:'android',
    CHROMEOS:'chromeOS'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
