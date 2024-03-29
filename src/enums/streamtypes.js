"use strict";

const types={
    VIDEO:'video',
    AUDIO:'audio',
    LIVE:'live',
    SCENE:'scene',
    PLAYLIST:'playlist',
    RADIO:'radio',
    COLLECTION:'collection',
    SET:'set',
    RACK:'rack',
    SERIES:'series',
    BUNDLE:'bundle',
    IMAGE:'image',
    ALBUM:'album',
    AUDIOALBUM:'audioalbum',
    FILE:'file',
    FOLDER:'folder',
    EVENT:'event',
    ARTICLE:'article',
    PRODUCT:'product',
    MAGAZINE:'magazine',
    PLACE:'place',
    LINK:'link',
    POST:'post',
    PERSON:'person',
    GROUP:'group',
    SHOW:'show',
    TEAM:'team',
    POLL:'poll',
    FORM:'form',
    VOTING:'voting',
    VARIANT:'variant',
    ALLMEDIA:'allmedia'
};

function getPluralizedStreamtype(streamtype){
    let plural=streamtype;
    switch(plural){
        case types.SERIES:
        case types.AUDIO:
        case types.LIVE:
        case types.RADIO:
        case types.ALLMEDIA:
        break;
        default:
            if(plural.endsWith("category")){
                plural=plural.replace("category","categories");
            }else if(!plural.endsWith('s')){
                plural+='s';
            }
        break;
    }
    return(plural);
}

function getAllTypes(){
    let toreturn=[];
    Object.values(types).forEach((t)=>{
        if(![types.VARIANT].includes(t)){
            toreturn.push(t);
        }
    });
    return(toreturn);
}

function getUploadableTypes(){
    return([types.VIDEO,types.AUDIO,types.IMAGE,types.FILE]);
}

function getDownloadLinkTypes(){
    return([types.VIDEO,types.AUDIO,types.IMAGE,types.FILE,types.SCENE,types.VARIANT]);
}

function getPlayerTypes(){
    return([types.VIDEO,types.PLAYLIST,types.SET,types.COLLECTION,types.AUDIO,types.RADIO,types.AUDIOALBUM,types.LIVE,types.SCENE,types.RACK,types.VARIANT]);
}

function getContainerTypes(){
    return([types.PLAYLIST,types.SET,types.ALBUM,types.COLLECTION,types.AUDIOALBUM,types.FOLDER,types.MAGAZINE,types.GROUP,types.BUNDLE,types.SERIES,types.RACK]);
}

function getSimpleContainerTypes(){
    return([types.PLAYLIST,types.ALBUM,types.AUDIOALBUM,types.MAGAZINE]);
}

function getExportableTypes(){
    return([types.VIDEO,types.LIVE,types.IMAGE,types.SCENE]);
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
module.exports.getPluralizedStreamtype=getPluralizedStreamtype;
module.exports.getUploadableTypes=getUploadableTypes;
module.exports.getDownloadLinkTypes=getDownloadLinkTypes;
module.exports.getPlayerTypes=getPlayerTypes;
module.exports.getContainerTypes=getContainerTypes;
module.exports.getSimpleContainerTypes=getSimpleContainerTypes;
module.exports.getExportableTypes=getExportableTypes;
