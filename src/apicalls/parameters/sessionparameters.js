"use strict";

const {Parameters}=require("../../internals/parameters");

class SessionParameters extends Parameters{

    constructor(){
        super();
    }

    setLanguage(language){
		if((language)&&(language.lenth==2)){
			this.set('explicitlanguage',language.toLowerCase());
		}
	}

	setGateway(gateway){
		this.set('gateway',gateway);
	}

	setDeliveryPartner(partner){
		this.set('deliveryPartner',partner);
	}

	setAffiliatePartnerCode(code){
		this.set('code',code);
	}

	setDeviceName(name){
		this.set('deviceName',name);
	}

	setPortal(portal){
		this.set('portal',$portal);
	}

	setLinkOrigin(origin){
		this.set('linkorigin',origin);
	}

}

module.exports={SessionParameters};