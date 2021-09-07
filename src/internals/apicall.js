"use strict";

const {Parameters}=require("./parameters");
const {Modifiers}=require("./modifiers");
const defaults=require("../enums/defaults");

class APICall{
    _parameters;
    _modifiers;
    _verb;
    _path;

    constructor(){
        this._verb=defaults.VERB_GET;
        this._parameters=new Parameters();
        this._modifiers=new Modifiers();
    }

	getPath(){
		return(this._path);
	}

	getVerb(){
		return(this._verb);
	}

	setParameters(params){
		this._parameters=params;
	}

	setModifiers(modifiers){
		this._modifiers=modifiers;
	}

	getParameters(){
		return(this._parameters);
	}

	getModifiers(){
		return(this._modifiers);
	}

}

module.exports={APICall};