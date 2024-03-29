"use strict";

const {APICall}=require("../internals/apicall");
const {SessionParameters}=require("./parameters/sessionparameters");
const {SessionModifiers}=require("./modifiers/sessionmodifiers");
const defaults=require("../enums/defaults");

class SessionCall extends APICall{

	constructor(){
        super();
		this._path="session/";
		this._verb=defaults.VERB_POST;
		this._parameters=new SessionParameters();
		this._modifiers=new SessionModifiers();
    }

	init(deviceHash,userHash="",currentSession="",forcePersistantSession=false,externalUserReference="",latitude=0,longitude=0){
		if(deviceHash){
			this._path+="init";
			this.getParameters().set('nxp_devh',deviceHash);
			if(userHash!=''){
				this.getParameters().set('nxp_userh',userHash);
			}else if(externalUserReference!=''){
				this.getParameters().set('externalUserReference',externalUserReference);
			}
			if(currentSession){
				this.getParameters().set('currentSession',currentSession);
			}
			if(forcePersistantSession){
				this.getParameters().set('forcePersistantSession',1);
			}
			if(latitude){
				this.getParameters().set('lat',latitude);
			}
			if(longitude){
				this.getParameters().set('lng',longitude);
			}
		}else{
			throw new Error("deviceHash cant be empty");
		}
	}

	loginWithUser(username,password){
		this._path+="login";
		this.getParameters().set("provider","manual");
		this.getParameters().set("username",username);
		this.getParameters().set("password",password);
	}

	loginWithToken(provider,token){
		this._path+="login";
		this.getParameters().set("provider",provider);
		this.getParameters().set("token",token);
	}

	logout(){
		this._path+="logout";
	}
}

module.exports={SessionCall};