"use strict";

class MetaData{
    #data;

    constructor(data){
        this.#data=data;
    }

	updateProcessingTime(time){
		this.#data['processingtime']=time;
	}

    getCode(){
		return(parseInt(this.#data['status']));
	}

	getAPIVersion(){
		return(this.#data['apiversion']);
	}

	getVerb(){
		return(this.#data['verb']);
	}

	getProcessingTime(){
		return(parseFloat(this.#data['processingtime']));
	}

	getCalledWithPath(){
		return(this.#data['calledwith']);
	}

	getCalledForDomain(){
		return(parseInt(this.#data['fordomain']));
	}

	getCalledForContext(){
		return(this.#data['calledfor']);
	}

	getErrorHint(){
		return(this.#data['errorhint']);
	}

}

module.exports={MetaData};