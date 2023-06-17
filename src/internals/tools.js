"use strict";

const defaults=require("../enums/defaults");
const date = require('date-and-time');

class Tools{

	static isManageCall(endpoint){
		return(endpoint.startsWith(defaults.API_KIND_MANAGE));
	}

	static isProcessingCall(endpoint){
		return(endpoint.startsWith(defaults.API_KIND_PROCESSING));
	}

	static isSessionCall(endpoint){
		return(endpoint.startsWith(defaults.API_KIND_SESSION));
	}

	static isStatisticsCall(endpoint){
		return(endpoint.startsWith(defaults.API_KIND_STATISTICS));
	}

	static isDomainCall(endpoint){
		return(endpoint.startsWith(defaults.API_KIND_DOMAIN));
	}

	static isSystemCall(endpoint){
		return(endpoint.startsWith(defaults.API_KIND_SYSTEM));
	}

	static isMediaCall(endpoint){
		return((!this.isDomainCall(endpoint))&&(!this.isManageCall(endpoint))&&(!this.isSessionCall(endpoint))&&(!this.isStatisticsCall(endpoint))&&(!this.isSystemCall(endpoint))&&(!this.isProcessingCall(endpoint)));
	}

	static callShouldIncreateTimeout(endpoint){
		return((this.isManageCall(endpoint))||(this.isStatisticsCall(endpoint)));
	}

	static dateIsValid(datestring){
		return (date.isValid(datestring,"YYYY-MM-DD"));
	}

}

module.exports={Tools};