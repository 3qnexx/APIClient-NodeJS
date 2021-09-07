"use strict";

const {APICall}=require("../internals/apicall");
const path = require('path');

class DomainCall extends APICall{

	constructor(){
        super();
		this._path="domain/";
    }

	publicInfo(){
		this._path+="publicinfo";
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

	accounts(){
		this._path+="accounts";
	}

	liveLinks(){
		this._path+="livelinks";
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

	broadcastLinks(){
		this._path+="previewlinks";
	}

	uploadLinks(){
		this._path+="previewlinks";
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

	networkDomains(addChannels=false,addFormats=false,addVideoCategories=false,addAudioCategories=false,addImageCategories=false,addFileCategories=false,addArticleCategories=false,addEventCategories=false,addPlaceCategories=false,addAccounts=false,addLiveLinks=false,addAutoUpdateFeeds=false,addTags=false,addCustomAttributes=false){
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
		if(addAccounts){
			this.getParameters().set("addAccounts",1);
		}
		if(addLiveLinks){
			this.getParameters().set("addLiveLinks",1);
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

}

module.exports={DomainCall};