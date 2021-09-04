"use strict";

const types={
    FIREFOX:'firefox',
    CHROME:'chrome',
    EDGE:'edge',
    EXPLORER:'explorer',
    SAFARI:'safari',
    OPERA:'opera',
    SAMSUNG:'samsung browser',
    HUAWEI:'huawei browser'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
