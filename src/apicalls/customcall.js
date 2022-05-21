"use strict";

const {APICall}=require("../internals/apicall");

const defaults=require("../enums/defaults");

class CustomCall extends APICall{

	constructor(){
        super();
    }

    setPath(path){
        if(path.startsWith("/")){
            path=path.slice(1);
        }
        this._path=path;
    }

    setVerb(verb){
        if(defaults.getAllVerbs().includes(verb)){
            this._verb=verb;
        }else{
            throw new Error("verb is not supported");
        }
    }
}

module.exports={CustomCall};