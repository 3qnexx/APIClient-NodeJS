"use strict";

const {ResultObject}=require("./resultobject");

class ResultIterator{
	#data;
	#asMediaObjects;

    constructor(data,asMediaObjects){
        this.#data=data;
		this.#asMediaObjects=asMediaObjects;
    }

	*iterator(){
		for (let key in this.#data) {
			var value = this.#data[key];
			if(this.#asMediaObjects){
				value = new ResultObject(value);
			}
			yield value;
		}
	}
	
	[Symbol.iterator]() {
		return this.iterator();
	}
}

module.exports={ResultIterator};