"use strict";

class MetaData{
    #data;
	#apiVersion;

    constructor(data){
        this.#data=data;
		if((data)&&(data.hasOwnProperty('version'))){
			this.#apiVersion="4.0";
		}else{
			this.#apiVersion=this.getAPIVersion();
		}
    }

	updateProcessingTime(time){
		this.#data[(this.#apiVersion=='4.0'?'processingTime':'processingtime')]=time;
	}

    getCode(){
		return(parseInt(this.#data['status']));
	}

	getAPIVersion(){
		return(this.#data[(this.#apiVersion=='4.0'?'version':'apiversion')]);
	}

	getVerb(){
		return(this.#data['verb']);
	}

	getProcessingTime(){
		return(parseFloat(this.#data[(this.#apiVersion=='4.0'?'processingTime':'processingtime')]));
	}

	getCalledWithPath(){
		return(this.#data[(this.#apiVersion=='4.0'?'calledWith':'calledwith')]);
	}

	getCalledForDomain(){
		return(parseInt(this.#data[(this.#apiVersion=='4.0'?'forDomain':(this.#apiVersion=='3.0'?'forclient':'fordomain'))]));
	}

	getCalledForContext(){
		return(this.#data[(this.#apiVersion=='4.0'?'calledFor':'calledfor')]);
	}

	getIsFromCache(){
		return(this.#data['fromCache']);
	}

	getErrorHint(){
		return(this.#data[(this.#apiVersion=='4.0'?'errorHint':'errorhint')]);
	}

	getNotice(){
		return(this.#data['notice']);
	}

}

module.exports={MetaData};