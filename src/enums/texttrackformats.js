"use strict";

const types={
    DATA:'data',
    AUTO:'auto',
    LANGUAGES:'languages',
    VTT:'vtt',
    SRT:'srt',
    TTML:'ttml',
    EBU_TT_DE:'ebuttde'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
