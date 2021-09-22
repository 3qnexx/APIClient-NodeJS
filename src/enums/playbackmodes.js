"use strict";

const types={
    BUMPER:'bumper',
    PREVIEW:'preview',
    PSEUDOLIVE:'pseudlive',
    SCENESPLIT:'scenesplit',
    STORY:'story',
    PRESENTATION:'presentation',
    ENDLESS:'endless',
    PREMIERE:'premiere',
    RELIVE:'relive',
    MINI:'mini',
    MICRO:'micro',
    HERO:'hero'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
