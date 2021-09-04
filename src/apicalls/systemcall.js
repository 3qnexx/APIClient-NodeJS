"use strict";

const {APICall}=require("../internals/apicall");
const streamtypes=require("../enums/streamtypes");

class SystemCall extends APICall{

	constructor(){
        super();
		this._path="system/";
    }

	videoGenres(){
		this._path+="videogenres";
	}

	audioGenres(){
		this._path+="audiogenres";
	}

	youtubeCategories(){
		this._path+="youtubecategories";
	}

	facebookCategories(){
		this._path+="facebookcategories";
	}

	rokuCategories(){
		this._path+="rokucategories";
	}

	countryCodes(){
		this._path+="countrycodes";
	}

	languageCodes(){
		this._path+="languagecodes";
	}

	regionCodesForCountry(country){
		if((country)&&(country.length==2)){
			this._path+="regioncodesfor/"+country;
		}
	}

	personTypes(){
		this._path+="persontypes";
	}

	editableAttributesFor(streamtype){
		if(streamtypes.getAllTypes().includes(streamtype)){
			this._path+="editableattributesfor/"+streamtype;
		}else{
			throw new Error("Streamtype not supported");
		}
	}

	editableRestrictionsFor(streamtype){
		if(streamtypes.getAllTypes().includes(streamtype)){
			this._path+="editablerestrictionsfor/"+streamtype;
		}else{
			throw new Error("Streamtype not supported");
		}
	}

	openOperations(){
		this._path+="openoperations";
	}

	operationStateFor(id){
		this._path+="operationstate/"+id;
	}

}

module.exports={SystemCall};