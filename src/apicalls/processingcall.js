"use strict";

const {APICall}=require("../internals/apicall");
const {Task}=require("../apicalls/helpers/task");
const defaults=require("../enums/defaults");

class ProcessingCall extends APICall{

	constructor(){
        super();
		this._path="processing/";
    }

	multiTask(tasks=[]){
		if((tasks)&&(Array.isArray(tasks))&&(tasks.length>0)){
			let finals=[];
			for(let k=0;k<tasks.length;k++){
				if(tasks[k] instanceof Task){
					if(tasks[k].isValid()){
						finals.push(tasks[k].get());
					}
				}
			}
			if(finals.length>0){
				this._verb=defaults.VERB_POST;
				this._path+="multitask";
				this.getParameters().set("tasks",JSON.stringify(finals));
			}else{
				throw new Error("at least one valid Task must be given");
			}
		}else{
			throw new Error("at least one Task must be given");
		}
	}

	getPage(pageID=0){
		if(pageID>0){
			this._path+="page/"+pageID;
		}else{
			throw new Error("Page ID must be set");
		}
	}

	getRow(rowID=0){
		if(rowID>0){
			this._path+="row/"+rowID;
		}else{
			throw new Error("Row ID must be set");
		}
	}

}

module.exports={ProcessingCall};