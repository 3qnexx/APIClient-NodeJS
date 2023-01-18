"use strict";

const {APICall}=require("../internals/apicall");
const path = require('path');

class DomainCall extends APICall{

	constructor(){
        super();
		this._path="domain/";
    }

	publicInfo(addCustomAttributes,addChannels,addFormats){
		this._path+="publicinfo";
		if(addCustomAttributes){
			this.getParameters().set("addCustomAttributes",1);
		}
		if(addChannels){
			this.getParameters().set("addChannels",1);
		}
		if(addFormats){
			this.getParameters().set("addFormats",1);
		}
	}

	instantConfiguration(token){
		this._path+="instantconfiguration/"+token;
	}

	offlineConfiguration(){
		this._path+="offlineconfiguration";
	}

	uploadConfiguration(localPath){
		if(localPath){
			this._path+="uploadconfiguration";
			this.getParameters().set("file",encodeURIComponent(path.basename(localPath)));
		}else{
			throw new Error("Filepath cannot be empty");
		}
	}

	apps(){
		this._path+="apps";
	}

	campaigns(){
		this._path+="campaigns";
	}

	accounts(){
		this._path+="accounts";
	}

	liveConnections(){
		this._path+="liveconnections";
	}

	channels(){
		this._path+="channels";
	}

	formats(){
		this._path+="formats";
	}

	videoCategories(){
		this._path+="videocategories";
	}

	audioCategories(){
		this._path+="audiocategories";
	}

	imageCategories(){
		this._path+="imagecategories";
	}

	fileCategories(){
		this._path+="filecategories";
	}

	articleCategories(){
		this._path+="articlecategories";
	}

	eventCategories(){
		this._path+="eventcategories";
	}

	placeCategories(){
		this._path+="placecategories";
	}

	productCategories(){
		this._path+="productcategories";
	}

	tags(){
		this._path+="tags";
	}

	autoUpdateFeeds(addStreamDetails=false){
		this._path+="autoupdatefeeds";
		if(addStreamDetails){
			this.getParameters().set("addStreamDetails",1);
		}
	}

	widgets(addStreamDetails=false, addEmbedDetails=false){
		this._path+="widgets";
		if(addStreamDetails){
			this.getParameters().set("addStreamDetails",1);
		}
		if(addEmbedDetails){
			this.getParameters().set("addEmbedDetails",1);
		}
	}

	previewLinks(){
		this._path+="previewlinks";
	}

	downloadLinks(){
		this._path+="downloadlinks";
	}

	dashboardLinks(){
		this._path+="dashboardlinks";
	}

	broadcastLinks(){
		this._path+="broadcastlinks";
	}

	uploadLinks(){
		this._path+="uploadlinks";
	}

	prices(){
		this._path+="prices";
	}

	affiliatePartners(){
		this._path+="affiliatepartners";
	}

	adProviders(){
		this._path+="adproviders";
	}

	payProviders(){
		this._path+="payproviders";
	}

	avsProviders(){
		this._path+="avsproviders";
	}

	licensors(){
		this._path+="licensors";
	}

	deliveryPartners(){
		this._path+="deliverypartners";
	}

	payModel(){
		this._path+="paymodel";
	}

	systemUsers(){
		this._path+="systemusers";
	}

	networkDomains(addChannels=false,addFormats=false,addVideoCategories=false,addAudioCategories=false,addImageCategories=false,addFileCategories=false,addArticleCategories=false,addEventCategories=false,addPlaceCategories=false,addProductCategories=false,addAccounts=false,addLiveConnections=false,addAutoUpdateFeeds=false,addTags=false,addCustomAttributes=false){
		this._path+="networkdomains";
		if(addChannels){
			this.getParameters().set("addChannels",1);
		}
		if(addFormats){
			this.getParameters().set("addFormats",1);
		}
		if(addVideoCategories){
			this.getParameters().set("addVideoCategories",1);
		}
		if(addAudioCategories){
			this.getParameters().set("addAudioCategories",1);
		}
		if(addImageCategories){
			this.getParameters().set("addImageCategories",1);
		}
		if(addFileCategories){
			this.getParameters().set("addFileCategories",1);
		}
		if(addArticleCategories){
			this.getParameters().set("addArticleCategories",1);
		}
		if(addEventCategories){
			this.getParameters().set("addEventCategories",1);
		}
		if(addPlaceCategories){
			this.getParameters().set("addPlaceCategories",1);
		}
		if(addProductCategories){
			this.getParameters().set("addProductCategories",1);
		}
		if(addAccounts){
			this.getParameters().set("addAccounts",1);
		}
		if(addLiveConnections){
			this.getParameters().set("addLiveConnections",1);
		}
		if(addAutoUpdateFeeds){
			this.getParameters().set("addAutoUpdateFeeds",1);
		}
		if(addTags){
			this.getParameters().set("addTags",1);
		}
		if(addCustomAttributes){
			this.getParameters().set("addCustomAttributes",1);
		}
	}

	textTemplate(reference){
		if(reference){
			this._path+="texttemplates/"+reference;
		}else{
			throw new Error("TextTemplates need a Reference");
		}
	}

}

module.exports={DomainCall};