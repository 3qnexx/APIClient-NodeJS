"use strict";

const types={
    SUBTITLES:'subtitles',
    CAPTIONS:'captions',
    FORCED:'forced'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;