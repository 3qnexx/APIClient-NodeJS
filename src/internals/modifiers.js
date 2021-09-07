"use strict";

class Modifiers{
    _data;

    constructor(){
        this._data={};
    }

	get(){
		return(this._data);
	}

	addPublishingDetails(){
		this._data['addPublishingDetails']=1;
	}

}

module.exports={Modifiers};