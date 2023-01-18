"use strict";

const {Parameters}=require("../../internals/parameters");

class SessionParameters extends Parameters{

    constructor(){
        super();
    }

    setLanguage(language){
		if((language)&&(language.lenth==2)){
			this.set('explicitLanguage',language.toLowerCase());
		}
	}

	setGateway(gateway){
		this.set('gateway',gateway);
	}

	setDeliveryPartner(partner){
		this.set('deliveryPartner',partner);
	}

	setAffiliatePartner(partner){
		this.set('affiliatePartner',partner);
	}

	setAffiliatePartnerCode(code){
		this.set('nxp_afpc',code);
	}

	setCampaign(campaign){
		this.set('campaign',campaign);
	}

	setCampaignCode(code){
		this.set('nxp_cmpc',code);
	}

	setDeviceName(name){
		this.set('deviceName',name);
	}

	setPortal(portal){
		this.set('portal',$portal);
	}

	setLinkOrigin(origin){
		this.set('linkOrigin',origin);
	}

}

module.exports={SessionParameters};