"use strict";

const {Parameters}=require("../../internals/parameters");

const dimensioncodes=require("../../enums/dimensioncodes");
const connectedmediadetails=require("../../enums/connectedmediadetails");
const streamtypes=require("../../enums/streamtypes");

class MediaParameters extends Parameters{

    constructor(){
        super();
    }

	restrictToCreatedAfter(time){
		this._params['createdAfter']=time;
	}

	restrictToModifiedAfter(time){
		this._params['modifiedAfter']=time;
	}

	restrictToPublishedAfter(time){
		this._params['publishedAfter']=time;
	}

	restrictToAvailableInCountry(country){
		if((country)&&(country.length==2)){
			this._params['country']=country.toLowerCase();
		}
	}

	restrictToSessionLanguage(restrict){
		this._params['onlyForSessionLanguage']=(restrict?1:0);
	}

	restrictToAudioLanguage(lang){
		if((lang)&&(lang.length==2)){
			this._params['country']=lang.toUpperCase();
		}
	}

	restrictToDimension(dim,height=0){
		if(dimensioncodes.getAllTypes().includes(dim)){
			this._params['dimension']=dim;
		}else if((height)&&(heigth>0)){
			this._params['dimension']=height;
		}
	}

	restrictToPlanned(){
		this._params['onlyPlanned']=1;
	}

	restrictToInactive(){
		this._params['onlyInactive']=1;
	}

	restrictToAgeGroup(minAge=-1,maxAge=-1){
		if(minAge>0){
			this._params['minAge']=minAge;
		}
		if(maxAge>0){
			this._params['maxAge']=maxAge;
		}
	}

	restrictToNoExplicit(){
		this._params['noExplicit']=1;
	}

	restrictToNoContentModerationHints(){
		this._params['noContentModerationHints']=1;
	}

	restrictToUnsecured(){
		this._params['onlyUnsecured']=1;
	}

	restrictToPanorama(){
		this._params['onlyPanorama']=1;
	}

	restrictToAnimations(){
		this._params['onlyAnimations']=1;
	}

	restrictToBlackAndWhite(){
		this._params['onlyBW']=1;
	}

	restrictToSurroundSound(){
		this._params['onlyWithSurroundSound']=1;
	}

	restrictToDownloadable(){
		this._params['onlyDownloadable']=1;
	}

	restrictToDuration(minDur=-1,maxDur=-1){
		if(minDur>0){
			this._params['minDuration']=minDur;
		}
		if(maxDur>0){
			this._params['maxDuration']=maxDur;
		}
	}

	restrictToChannel(channel,respectChannelHierarchy=false){
		this._params['channel']=channel;
		if(respectChannelHierarchy){
			this._params['respectChannelHierarchy']=1;
		}
	}

	restrictToFormat(format){
		this._params['format']=format;
	}

	restrictToGenre(genre){
		this._params['genre']=genre;
	}

	restrictToType(type){
		this._params['type']=type;
	}

	restrictToPurpose(purpose){
		this._params['purpose']=purpose;
	}

	//only valid for POST
	restrictToPlatform(platform){
		this._params['platform']=platform;
	}

	//only valid for POST
	restrictToAccount(account){
		this._params['account']=account;
	}

	//only valid for FILE
	restrictToFileType(type){
		this._params['fileType']=type;
	}

	//only valid for STUDIO
	restrictToStreamtype(type=streamtypes.VIDEO){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(type)){
			this._params['forStreamtype']=type;
		}else{
			throw new Error("Streamtype is not supported.");
		}
	}

	//only valid for COLLECTIONS // ALLMEDIA
	restrictToStreamtypes(list){
		if(Array.isArray(list)){
			this._params['selectedStreamtypes']=list.join(",");
		}
	}

	excludeItems(list){
		if(Array.isArray(list)){
			this._params['excludeItems']=list.join(",");
		}
	}

	setConnectedMediaDetails(level=connectedmediadetails.DEFAULT){
		if(connectedmediadetails.getAllTypes().includes(level)){
			this._params['connectedMediaDetails']=format;
		}else{
			throw new Error("Detail Level is unknown");
		}
	}

	includeUGC(include,onlyUGC=false,onlyForUser=0){
		if(onlyForUser>0){
			onlyUGC=true;
			this._params['forUserID']=1;
		}
		if(onlyUGC){
			include=1;
			this._params['onlyUGC']=1;
		}
		this._params['includeUGC']=(include?1:0);
	}

	includeRemote(include,onlyRemote=false){
		if(onlyRemote){
			include=1;
			this._params['onlyRemote']=1;
		}
		this._params['includeRemote']=(include?1:0);
	}

	includePay(onlyFree=false,onlyPayed=false,onlyPremium=false,onlyStandard=false){
		if(onlyFree){
			this._params['onlyFree']=1;
		}else if(onlyPayed){
			this._params['onlyPay']=1;
			if(onlyPremium){
				this._params['onlyPremiumPay']=1;
			}else if(onlyStandard){
				this._params['onlyStandardPay']=1;
			}
		}
	}

	includeNotListables(include){
		this._params['includeNotListables']=(include?1:0);
	}

	forceResults(force){
		this._params['forceResults']=(force?1:0);
	}

	includeTrailers(include,onlyTrailers=false){
		if(onlyTrailers){
			include=1;
			this._params['onlyTrailers']=1;
		}
		this._params['includeTrailers']=(include?1:0);
	}

	includeBonus(include,onlyBonus=false){
		if(onlyBonus){
			include=1;
			this._params['onlyBonus']=1;
		}
		this._params['includeBonus']=(include?1:0);
	}

	includeLiveRepresentations(include,onlyRepresentations=false){
		if(onlyRepresentations){
			include=1;
			this._params['onlyLiveRepresentations']=1;
		}
		this._params['includeLiveRepresentations']=(include?1:0);
	}

	includePremieres(include){
		this._params['includePremieres']=(include?1:0);
	}

	includeAutoRecordings(include){
		this._params['includeAutoRecordings']=(include?1:0);
	}

	includeEpisodes(include,onlyEpisodes=false){
		if(onlyEpisodes){
			include=1;
			this._params['onlyEpisodes']=1;
		}
		this._params['includeEpisodes']=(include?1:0);
	}

	includeStories(include,onlyStories=false){
		if(onlyStories){
			include=1;
			this._params['onlyStories']=1;
		}
		this._params['includeStories']=(include?1:0);
	}

	includeStoryParts(include,onlyStoryParts=false){
		if(onlyStoryParts){
			include=1;
			this._params['onlyStoryParts']=1;
		}
		this._params['includeStoryParts']=(include?1:0);
	}

	includeSeasons(include,onlySeasons=false){
		if(onlySeasons){
			include=1;
			this._params['onlySeasons']=1;
		}
		this._params['includeSeasons']=(include?1:0);
	}

}

module.exports={MediaParameters};