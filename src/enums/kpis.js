"use strict";

const types={
    DISPLAY:'display',
    PLAYERSTART:'playerstart',
    VIEW:'view',
    VIEWTIME:'viewtime',
    VIEWTIMEAVERAGE:'viewtimeaverage',
    VIEWEXTERNAL:'viewexternal',
    DOWNLOAD:'download',
    CLICK:'click',
    PROGRESS25:'progress25',
    PROGRESS50:'progress50',
    PROGRESS75:'progress75',
    PROGRESS95:'progress95',
    FINISHED:'progress100',
    ADREQUEST:'adrequest',
    ADIMPRESSION:'adimpression'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
