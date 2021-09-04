"use strict";

const defs={
    API_URL:"api.nexx.cloud",
    API_VERSION:"3.1",
    API_KIND_MEDIA:'media',
    API_KIND_DOMAIN:'domain',
    API_KIND_MANAGE:'manage',
    API_KIND_SESSION:'session',
    API_KIND_SYSTEM:'system',
    API_KIND_STATISTICS:'statistics',
    API_KIND_PROCESSING:'processing',
    VERB_GET:"GET",
    VERB_POST:"POST",
    VERB_PUT:"PUT",
    VERB_DELETE:"DELETE",
    MAX_RESULT_LIMIT:100,
    MAX_RESULT_LIMIT_STATISTICS:100000
};

function getAllVerbs(){
    return([defs.VERB_GET,defs.VERB_POST,defs.VERB_PUT,defs.VERB_DELETE]);
}

module.exports=defs;
module.exports.getAllVerbs=getAllVerbs;