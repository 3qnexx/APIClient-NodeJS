"use strict";

class Paging{
    #data;
    #size;
	#apiVersion;

    constructor(data,size,apiVersion){
        this.#data=data;
        this.#size=size;
		this.#apiVersion=apiVersion;
    }

    updateSize(size){
		this.#size=size;
	}

	getStart(){
		return(this.#data[(this.#apiVersion=='4.0'?'offset':'start')]);
	}

	getOffset(){
		return(this.getStart());
	}

	getLimit(){
		return(this.#data['limit']);
	}

	getSize(){
		return(this.#size);
	}

	getTotalSize(){
		return(this.#data[(this.#apiVersion=='4.0'?'total':'resultcount')]);
	}

	hasMoreResults(){
		return((this.getStart()+this.getSize())<this.getTotalSize());
	}

}

module.exports={Paging};