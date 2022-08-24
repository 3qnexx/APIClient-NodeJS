"use strict";

const defaults=require("../enums/defaults");
const gateways=require("../enums/gateways");
const imageformats=require("../enums/imageformats");
const distanceunits=require("../enums/distanceunits");
const temperatureunits=require("../enums/temperatureunits");

class Parameters{
    _data;

    constructor(){
        this._data={};
    }

	set(key,value){
		this._data[key]=value;
	}

	setByObject(obj){
		for (const [key, value] of Object.entries(obj)) {
            this.set(key,value);
        }
	}

	disableCaching(){
		this.set('noc',1);
	}

	enableExtendedImageGeometry(){
		this.set('extendCoverGeometry',1);
	}

	setCallingContext(context){
		this.set('cfo',context);
	}

	restrictToCurrentDomain(){
		this.set('restrictToCurrentDomain',1);
	}

	restrictToChildDomain(dom){
		this.set('restrictToChildDomain',dom);
	}

	setImageFormat(format){
		if(imageformats.getAllTypes().includes(format)){
			this.set('imageFormat',format);
		}else{
			throw new Error("ImageFormat string is unknown");
		}
	}

	setRichTextFormat(format){
		this.set('richTextFormat',format);
	}

	setDateFormat(format,applyLocalTimezone=true){
		this.set('dateFormat',format);
		if(applyLocalTimezone){
			this.setDateFormatTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
	}

	setDateFormatTimezone(timezone){
		this.set('dateFormatTimezone',timezone);
	}

	setDistanceUnit(unit){
		if(distanceunits.getAllTypes().includes(unit)){
			this.set('distanceUnit',unit);
		}
	}

	setTemperatureUnit(unit){
		if(temperatureunits.getAllTypes().includes(unit)){
			this.set('temperatureUnit',unit);
		}
	}

	setGateway(gateway){
		if(gateways.getMediaGateways().includes(gateway)){
			this.set('forceGateway',gateway);
		}else{
			throw new Error("Gateway string is unknown");
		}
	}

	setLanguage(language){
		if((language)&&(language.length==2)){
			this.set('forceLanguage',language.toLowerCase());
		}
	}

	setAdditionalReturnFields(fields='all'){
		if(Array.isArray(fields)){
			fields=fields.join(",");
		}
		this.set('additionalFields',fields);
	}

	setOrder(orderBy,direction="DESC"){
		this.set('orderBy',orderBy);
		if(['ASC','DESC'].includes(direction.toUpperCase())){
			this.set('orderDir',direction.toUpperCase());
		}
	}

	setLimit(limit,start=0){
		if(limit>defaults.MAX_RESULT_LIMIT){
			throw new Error("max Limit is ".defaults.MAX_RESULT_LIMIT);
		}else{
			this.set('limit',Math.abs(limit));
			if(start>0){
				this.setStart(start);
			}
		}
	}

	setChildLimit(limit){
		if(limit>defaults.MAX_RESULT_LIMIT){
			throw new Error("max Child Limit is ".defaults.MAX_RESULT_LIMIT);
		}else{
			this.set('childLimit',Math.abs(limit));
		}
	}

	setStart(start){
		this.set('start',start);
	}

	get(){
		return(this._data);
	}

}

module.exports={Parameters};