"use strict";

const streamtypes=require("../../enums/streamtypes");

class Task{
	#data;

	constructor(name,endpoint,method,item=0,parameters={}){
		this.#data={};
		if(name){
			this.setName(name);
		}
		if(endpoint){
			this.setEndpoint(endpoint);
		}
		if(method){
			this.setMethod(method);
		}
		if(item>0){
			this.setItem(item);
		}
		if((typeof(parameters)=="object")&&(parameters!==null)&&(Object.keys(parameters).length>0)){
			this.setParameters(parameters);
		}
	}

	setName(name){
		this.#data['name']=name;
	}

	setEndpoint(endpoint){
		if(streamtypes.getAllTypes().includes(endpoint)){
			endpoint=streamtypes.getPluralizedStreamtype(endpoint);
		}
		this.#data['endpoint']=endpoint;
	}

	setMethod(method){
		this.#data['method']=method;
	}

	setItem(item){
		this.#data['item']=item;
	}

	setParameters(parameters){
		if((typeof(parameters)=="object")&&(parameters!==null)&&(Object.keys(parameters).length>0)){
			this.#data['parameters']=parameters;
		}
	}

	isValid(){
		return((this.#data.name)&&(this.#data.endpoint)&&(this.#data.method));
	}

	get(){
		let toreturn=null;
		if(this.isValid()){
			toreturn=this.#data;
		}
		return(toreturn);
	}
}

module.exports={Task};