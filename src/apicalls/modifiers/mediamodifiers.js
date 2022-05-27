"use strict";

const {Modifiers}=require("../../internals/modifiers");
const captionformats=require("../../enums/captionformats");
const connectedmediadetails=require("../../enums/connectedmediadetails");
const commentcontexts=require("../../enums/commentcontexts");

class MediaModifiers extends Modifiers{

    constructor(){
        super();
    }

	addGeoDetails(){
		this._params['addGeoDetails']=1;
	}

	addAuthorDetails(){
		this._params['addAuthorDetails']=1;
	}

	addStreamDetails(){
		this._params['addStreamDetails']=1;
	}

	addEmbedDetails(){
		this._params['addEmbedDetails']=1;
	}

	addStatusDetails(){
		this._params['addStatusDetails']=1;
	}

	addRestrictionDetails(){
		this._params['addRestrictionDetails']=1;
	}

	addAwards(){
		this._params['addAwards']=1;
	}

	addFaceDetails(){
		this._params['addFaceDetails']=1;
	}

	addPodcastDetails(){
		this._params['addPodcastDetails']=1;
	}

	addRenditionDetails(){
		this._params['addRenditionDetails']=1;
	}

	addTranscodingDetails(){
		this._params['addTranscodingDetails']=1;
	}

	addIngestDetails(){
		this._params['addIngestDetails']=1;
	}

	addInteractionOptions(){
		this._params['addInteractionOptions']=1;
	}

	addConnectedMedia(options='all',connectedMediaDetails=""){
		if(Array.isArray(options)){
			options=options.join(',');
		}
		this._params['addConnectedMedia']=options;
		if(connectedMediaDetails!=""){
			if(connectedmediadetails.getAllTypes().includes(connectedMediaDetails)){
				this._params['connectedMediaDetails']=connectedMediaDetails;
			}else{
				throw new Error("Detail Level is unknown");
			}
		}
	}

	addParentMedia(options='all',parentMediaDetails=""){
		if(Array.isArray(options)){
			options=options.join(',');
		}
		this._params['addParentMedia']=options;
		if(parentMediaDetails!=""){
			if(connectedmediadetails.getAllTypes().includes(parentMediaDetails)){
				this._params['parentMediaDetails']=parentMediaDetails;
			}else{
				throw new Error("Detail Level is unknown");
			}
		}
	}

	addChildMedia(options='all',childMediaDetails=""){
		if(Array.isArray(options)){
			options=options.join(',');
		}
		this._params['addChildMedia']=options;
		if(childMediaDetails!=""){
			if(connectedmediadetails.getAllTypes().includes(childMediaDetails)){
				this._params['childMediaDetails']=childMediaDetails;
			}else{
				throw new Error("Detail Level is unknown");
			}
		}
	}

	addReferencingMedia(options='all',referencingMediaDetails=""){
		if(Array.isArray(options)){
			options=options.join(',');
		}
		this._params['addReferencingMedia']=options;
		if(referencingMediaDetails!=""){
			if(connectedmediadetails.getAllTypes().includes(referencingMediaDetails)){
				this._params['referencingMediaDetails']=referencingMediaDetails;
			}else{
				throw new Error("Detail Level is unknown");
			}
		}
	}

	addComments(context='all'){
		if(commentcontexts.getAllTypes().includes(context)){
			this._params['addComments']=context;
		}else{
			throw new Error("Comment Contetx is unknown");
		}
	}

	addAnnotations(){
		this._params['addAnnotations']=1;
	}

	addStatistics(){
		this._params['addStatistics']=1;
	}

	addPaymentData(){
		this._params['addPaymentData']=1;
	}

	addTranslations(){
		this._params['addTranslations']=1;
	}

	addCustomAttributes(){
		this._params['addCustomAttributes']=1;
	}

	addExportDetails(){
		this._params['addExportDetails']=1;
	}

	addPreviewLinks(){
		this._params['addPreviewLinks']=1;
	}

	addBroadcastLinks(){
		this._params['addBroadcastLinks']=1;
	}

	addFileURLs(){
		this._params['addFileURLs']=1;
	}

	addStreamingURLs(){
		this._params['addStreamingURLs']=1;
	}

	addFeatures(){
		this._params['addFeatures']=1;
	}

	addInsights(options='all'){
		if(Array.isArray(options)){
			options=options.join(',');
		}
		this._params['addInsights']=options;
	}

	addHotSpots(){
		this._params['addHotSpots']=1;
	}

	addCaptions(format){
		if(captionformats.getAllTypes().includes(format)){
			this._params['addCaptions']=format;
		}else{
			throw new Error("CaptionFormat string is unknown");
		}
	}

	addBumpers(){
		this._params['addBumpers']=1;
	}

	addVariantDetails(){
		this._params['addVariantDetails']=1;
	}

	//only valid for Persons
	addTaggedImages(){
		this._params['addTaggedImages']=1;
	}

	//only valid for Persons
	addTaggedVideos(){
		this._params['addTaggedVideos']=1;
	}

	//only valid for Series
	addSeasonList(){
		this._params['addSeasonList']=1;
	}

	//only valid for Series
	addEpisodesForSeason(season){
		if(season=='latest'){
			this._params['addEpisodesForSeason']=season;
		}else if(Number.isInteger(season)){
			this._params['addEpisodesForSeason']=season;
		}
	}

}

module.exports={MediaModifiers};