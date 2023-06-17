"use strict";

const {Parameters}=require("../../internals/parameters");

const defaults=require("../../enums/defaults");
const gateways=require("../../enums/gateways");
const devicetypes=require("../../enums/devicetypes");
const itemreferences=require("../../enums/itemreferences");
const pageintegrationtypes=require("../../enums/pageintegrationtypes");
const browsers=require("../../enums/browsers");
const operatingsystems=require("../../enums/operatingsystems");
const consentenvironments=require("../../enums/consentenvironments");
const playbackmodes=require("../../enums/playbackmodes");
const datamodes=require("../../enums/datamodes");
const startconditions=require("../../enums/startconditions");
const mediaorigins=require("../../enums/mediaorigins");
const viewcounttypes=require("../../enums/viewcounttypes");

class StatisticParameters extends Parameters{

    constructor(){
        super();
    }

	includeNetworkDomains(include=false){
		this.set("includeNetworkDomains",(include?1:0));
	}

	setTimezone(zone,applyLocalTimezone=true){
		if(applyLocalTimezone){
			zone=Intl.DateTimeFormat().resolvedOptions().timeZone;
		}
		if(zone){
			this.set("timezone",zone);
		}
	}

	setGateway(gateway){
		if(gateways.getAllTypes().includes(gateway)){
			this.set('gateway',gateway);
		}else{
			throw new Error("Gateway string is unknown");
		}
	}

	setDevice(device){
		if(devicetypes.getAllTypes().includes(device)){
			this.set('device',device);
		}else{
			throw new Error("Device string is unknown");
		}
	}

	setChannel(channel){
		this.set("channel",channel);
	}

	setFormat(format){
		this.set("format",format);
	}

	setStreamtype(streamtype){
		this.set("streamtype",streamtype);
	}

	restrictToItem(item){
		this.set("item",item);
	}

	setItemReference(reference){
		if(itemreferences.getAllTypes().includes(reference)){
			this.set('itemReference',reference);
		}else{
			throw new Error("itemReference string is unknown");
		}
	}

	setFrom(from){
		this.set("from",from);
	}

	setTo(to){
		this.set("to",to);
	}

	setLimit(limit,start=0){
		this.set('limit',Math.min(limit,defaults.MAX_RESULT_LIMIT_STATISTICS));
	}

	restrictToDeliveryPartner(partner){
		this.set('deliveryPartner',partner);
	}

	restrictToAffiliatePartner(partner){
		this.set('affiliatePartner',partner);
	}

	restrictToCampaign(campaign){
		this.set('campaign',campaign);
	}

	restrictToLicensor(licensor){
		this.set('licensor',licensor);
	}

	restrictToPageIntegration(pageIntegration){
		if(pageintegrationtypes.getAllTypes().includes(pageIntegration)){
			this.set('pageIntegration',pageIntegration);
		}else{
			throw new Error("pageIntegration string is unknown");
		}
	}

	restrictToBrowser(browser){
		if(browsers.getAllTypes().includes(browser)){
			this.set('browser',browser);
		}else{
			throw new Error("browser string is unknown");
		}
	}

	restrictToOS(os){
		if(operatingsystems.getAllTypes().includes(os)){
			this.set('browser',os);
		}else{
			throw new Error("OS string is unknown");
		}
	}

	restrictToCountry(code){
		if((code)&&(code.length==2)){
			this.set('countryCode',code.toLowerCase());
		}else{
			throw new Error("Country Code must be given in 2-Letter-Format");
		}
	}

	restrictToRegion(region){
		this.set('regionCode',region);
	}

	restrictToManufacturer(manufacturer){
		this.set('manufacturer',manufacturer);
	}

	restrictToDeliveryDomain(domain){
		this.set('deliveryDomain',domain);
	}

	restrictToConsentEnvironment(environment){
		if(consentenvironments.getAllTypes().includes(environment)){
			this.set('consentEnvironment',environment);
		}else{
			throw new Error("Environment string is unknown");
		}
	}

	restrictToPlaybackMode(playbackMode){
		if(playbackmodes.getAllTypes().includes(playbackMode)){
			this.set('playbackMode',playbackMode);
		}else{
			throw new Error("PlaybackMode string is unknown");
		}
	}

	restrictToDataMode(mode){
		if(datamodes.getAllTypes().includes(mode)){
			this.set('dataMode',mode);
		}else{
			throw new Error("Data Mode string is unknown");
		}
	}

	restrictToMediaOrigin(origin){
		if(mediaorigins.getAllTypes().includes(origin)){
			this.set('mediaOrigin',origin);
		}else{
			throw new Error("mediaOrigin string is unknown");
		}
	}

	restrictToStartCondition(condition){
		if(startconditions.getAllTypes().includes(condition)){
			this.set('startCondition',condition);
		}else{
			throw new Error("startCondition string is unknown");
		}
	}

	restrictToViewCount(viewcount){
		if(viewcounttypes.getAllTypes().includes(viewcount)){
			this.set('viewCount',viewcount);
		}else{
			throw new Error("viewCount string is unknown");
		}
	}

}

module.exports={StatisticParameters};