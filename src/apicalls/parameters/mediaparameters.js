"use strict";

const {Parameters}=require("../../internals/parameters");

const dimensioncodes=require("../../enums/dimensioncodes");
const autofillresultmodes=require("../../enums/autofillresultmodes");
const connectedmediadetails=require("../../enums/connectedmediadetails");
const streamtypes=require("../../enums/streamtypes");

class MediaParameters extends Parameters{

    constructor(){
        super();
    }

	restrictToCreatedAfter(time){
		this.set('createdAfter',time);
	}

	restrictToModifiedAfter(time){
		this.set('modifiedAfter',time);
	}

	restrictToPublishedAfter(time){
		this.set('publishedAfter',time);
	}

	restrictToAvailableInCountry(country){
		if((country)&&(country.length==2)){
			this.set('country',country.toLowerCase());
		}
	}

	restrictToSessionLanguage(restrict){
		this.set('onlyForSessionLanguage',(restrict?1:0));
	}

	restrictToAudioLanguage(lang){
		if((lang)&&(lang.length==2)){
			this.set('country',lang.toUpperCase());
		}
	}

	restrictToDimension(dim,height=0){
		if(dimensioncodes.getAllTypes().includes(dim)){
			this.set('dimension',dim);
		}else if((height)&&(height>0)){
			this.set('dimension',height);
		}
	}

	restrictToHDR(){
		this.set('onlyHDR',1);
	}

	restrictToPlanned(){
		this.set('onlyPlanned',1);
	}

	restrictToInactive(){
		this.set('onlyInactive',1);
	}

	restrictToAgeGroup(minAge=-1,maxAge=-1){
		if(minAge>0){
			this.set('minAge',minAge);
		}
		if(maxAge>0){
			this.set('maxAge',maxAge);
		}
	}

	restrictToNoExplicit(){
		this.set('noExplicit',1);
	}

	restrictToNoContentModerationHints(){
		this.set('noContentModerationHints',1);
	}

	restrictToUnsecured(){
		this.set('onlyUnsecured',1);
	}

	restrictToPanorama(){
		this.set('onlyPanorama',1);
	}

	restrictToAnimations(){
		this.set('onlyAnimations',1);
	}

	restrictToBlackAndWhite(){
		this.set('onlyBW',1);
	}

	restrictToSurroundSound(){
		this.set('onlyWithSurroundSound',1);
	}

	restrictToDownloadable(){
		this.set('onlyDownloadable',1);
	}

	restrictToDuration(minDur=-1,maxDur=-1){
		if(minDur>0){
			this.set('minDuration',minDur);
		}
		if(maxDur>0){
			this.set('maxDuration',maxDur);
		}
	}

	restrictToChannel(channel,respectChannelHierarchy=false){
		this.set('channel',channel);
		if(respectChannelHierarchy){
			this.set('respectChannelHierarchy',1);
		}
	}

	restrictToFormat(format){
		this.set('format',format);
	}

	restrictToGenre(genre){
		this.set('genre',genre);
	}

	restrictToType(type){
		this.set('type',type);
	}

	//only valid for VIDEO and IMAGE
	restrictToContentType(type){
		this.set('contentType',type);
	}

	//only valid for SCENE, RACK and LINK
	restrictToPurpose(purpose){
		this.set('purpose',purpose);
	}

	//only valid for POST
	restrictToPlatform(platform){
		this.set('platform',platform);
	}

	//only valid for POST
	restrictToAccount(account){
		this.set('account',account);
	}

	//only valid for FILE
	restrictToFileType(type){
		this.set('fileType',type);
	}

	//only valid for STUDIO
	restrictToStreamtype(type=streamtypes.VIDEO){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(type)){
			this.set('forStreamtype',type);
		}else{
			throw new Error("Streamtype is not supported.");
		}
	}

	//only valid for ALLMEDIA
	restrictToStreamtypes(list){
		if(Array.isArray(list)){
			this.set('selectedStreamtypes',list.join(","));
		}
	}

	autoFillResults(mode=autofillresultmodes.RANDOM){
		if(autofillresultmodes.getAllTypes().includes(mode)){
			this.set('autoFillResults',mode);
		}else{
			throw new Error("AutoFill Mode is not supported");
		}
	}

	applyContentModerationFilters(){
		this.set('applyContentModerationFilters',1);
	}

	excludeItems(list){
		if(Array.isArray(list)){
			this.set('excludeItems',list.join(","));
		}
	}

	setConnectedMediaDetails(level=connectedmediadetails.DEFAULT){
		if(connectedmediadetails.getAllTypes().includes(level)){
			this.set('connectedMediaDetails',level);
		}else{
			throw new Error("Detail Level is unknown");
		}
	}

	setParentMediaDetails(level=connectedmediadetails.DEFAULT){
		if(connectedmediadetails.getAllTypes().includes(level)){
			this.set('parentMediaDetails',level);
		}else{
			throw new Error("Detail Level is unknown");
		}
	}

	setReferencingMediaDetails(level=connectedmediadetails.DEFAULT){
		if(connectedmediadetails.getAllTypes().includes(level)){
			this.set('referencingMediaDetails',level);
		}else{
			throw new Error("Detail Level is unknown");
		}
	}

	includeUGC(include,onlyUGC=false,onlyForUser=0){
		if(onlyForUser>0){
			onlyUGC=true;
			this.set('forUserID',1);
		}
		if(onlyUGC){
			include=1;
			this.set('onlyUGC',1);
		}
		this.set('includeUGC',(include?1:0));
	}

	includeRemote(include,onlyRemote=false){
		if(onlyRemote){
			include=1;
			this.set('onlyRemote',1);
		}
		this.set('includeRemote',(include?1:0));
	}

	includeAIGenerated(include,onlyAIGenerated=false){
		if(onlyAIGenerated){
			include=1;
			this.set('onlyAIGenerated',1);
		}
		this.set('includeAIGenerated',(include?1:0));
	}

	includePay(onlyFree=false,onlyPayed=false,onlyPremium=false,onlyStandard=false){
		if(onlyFree){
			this.set('onlyFree',1);
		}else if(onlyPayed){
			this.set('onlyPay',1);
			if(onlyPremium){
				this.set('onlyPremiumPay',1);
			}else if(onlyStandard){
				this.set('onlyStandardPay',1);
			}
		}
	}

	includeNotListables(include){
		this.set('includeNotListables',(include?1:0));
	}

	includeInvalidChildMedia(include){
		this.set('includeInvalidChildMedia',(include?1:0));
	}

	includeTrailers(include,onlyTrailers=false){
		if(onlyTrailers){
			include=1;
			this.set('onlyTrailers',1);
		}
		this.set('includeTrailers',(include?1:0));
	}

	includeBonus(include,onlyBonus=false){
		if(onlyBonus){
			include=1;
			this.set('onlyBonus',1);
		}
		this.set('includeBonus',(include?1:0));
	}

	includeLiveRepresentations(include,onlyRepresentations=false){
		if(onlyRepresentations){
			include=1;
			this.set('onlyLiveRepresentations',1);
		}
		this.set('includeLiveRepresentations',(include?1:0));
	}

	includePremieres(include){
		this.set('includePremieres',(include?1:0));
	}

	includeReLive(include){
		this.set('includeReLive',(include?1:0));
	}

	includeEpisodes(include,onlyEpisodes=false){
		if(onlyEpisodes){
			include=1;
			this.set('onlyEpisodes',1);
		}
		this.set('includeEpisodes',(include?1:0));
	}

	includeStories(include,onlyStories=false){
		if(onlyStories){
			include=1;
			this.set('onlyStories',1);
		}
		this.set('includeStories',(include?1:0));
	}

	includeStoryParts(include,onlyStoryParts=false){
		if(onlyStoryParts){
			include=1;
			this.set('onlyStoryParts',1);
		}
		this.set('includeStoryParts',(include?1:0));
	}

	includeSeasons(include,onlySeasons=false){
		if(onlySeasons){
			include=1;
			this.set('onlySeasons',1);
		}
		this.set('includeSeasons',(include?1:0));
	}

	includeRackParts(include,onlyRackParts=false){
		if(onlyRackParts){
			include=1;
			this.set('onlyRackParts',1);
		}
		this.set('includeRackParts',(include?1:0));
	}

	includePodcastSources(include,onlyPodcastSources=false){
		if(onlyPodcastSources){
			include=1;
			this.set('onlyPodcastSources',1);
		}
		this.set('includePodcastSources',(include?1:0));
	}

}

module.exports={MediaParameters};