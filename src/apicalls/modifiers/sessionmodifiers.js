"use strict";

const {Modifiers}=require("../../internals/modifiers");

class SessionModifiers extends Modifiers{

    constructor(){
        super();
    }

	addDomainData(){
		this.set('addDomainData',1);
	}

	addTextTemplates(){
        this.set('addTextTemplates',1);
	}

	addPriceModel(){
        this.set('addPriceModel',1);
	}

	addAdModel(){
        this.set('addAdModel',1);
	}

	addChannels(){
        this.set('addChannels',1);
	}

	addFormats(){
        this.set('addFormats',1);
	}

}

module.exports={SessionModifiers};