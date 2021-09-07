"use strict";

class Paging{
    #data;
    #size;

    constructor(data,size){
        this.#data=data;
        this.#size=size;
    }

    updateSize(size){
		this.#size=size;
	}

	getStart(){
		return(this.#data['start']);
	}

	getLimit(){
		return(this.#data['limit']);
	}

	getSize(){
		return(this.#size);
	}

	getTotalSize(){
		return(this.#data['resultcount']);
	}

	hasMoreResults(){
		return((this.getStart()+this.getSize())<this.getTotalSize());
	}

}

module.exports={Paging};