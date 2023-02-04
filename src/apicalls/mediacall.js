"use strict";

const {APICall}=require("../internals/apicall");
const {MediaParameters}=require("./parameters/mediaparameters");
const {MediaModifiers}=require("./modifiers/mediamodifiers");

const defaults=require("../enums/defaults");
const streamtypes=require("../enums/streamtypes");
const querymodes=require("../enums/querymodes");
const geoquerymodes=require("../enums/geoquerymodes");
const captionroles=require("../enums/texttrackroles");

class MediaCall extends APICall{
    _streamtype;
    _method='';

	constructor(streamtype=streamtypes.VIDEO){
        super();
		this._parameters=new MediaParameters();
		this._modifiers=new MediaModifiers();
        this.setStreamtype(streamtype);
    }

    setStreamtype(streamtype){
        if(streamtypes.getAllTypes().includes(streamtype)){
		    this._streamtype=streamtype;
        }else{
            throw new Error("streamtype is not supported.");
        }
	}

	getPath(){
		this._path=streamtypes.getPluralizedStreamtype(this._streamtype)+"/"+this._method;
		return(super.getPath());
	}

    #verifyParameter(method,param,streamtypes,ignoreID){
		if(streamtypes.includes(this._streamtype)){
			if(ignoreID){
				this._method=method;
			}else if(param>0){
				this._method=method+"/"+param;
			}else{
                throw new Error("Media id is necessary");
			}
		}else{
            throw new Error("Streamtype not supported");
		}
	}

    byID(id){
		this._method="byid/"+id;
	}

	byGlobalID(id){
		this._method="byglobalid/"+id;
	}

	byHash(hash){
		this._method="byhash/"+hash;
	}

	byReference(refnr){
		this._method="byreference/"+refnr;
	}

	bySlug(slug){
		this._method="byslug/"+slug;
	}

	byCodename(codename){
		this._method="bycodename/"+codename;
	}

	byRemoteReference(ref){
		this._method="byremotereference/"+ref;
	}

	all(){
		this._method="all";
	}

	latest(){
		this._method="latest";
	}

	picked(){
		this._method="picked";
	}

	evergreens(){
		this._method="evergreens";
	}

	topSlider(){
		this._method="topslider";
	}

	forKids(){
		this._method="forkids";
	}

	random(){
		this._method="random";
	}

	expiring(){
		this._method="expiring";
	}

	comingSoon(){
		this._method="comingsoon";
	}

	mostActive(timeFrame=5){
		this._method="mostactive";
		this.getParameters().set("timeframe",timeFrame);
	}

	mostActiveExternal(timeFrame=5){
		this._method="mostactiveexternal";
		this.getParameters().set("timeframe",timeFrame);
	}

	topItems(){
		this._method="topitems";
	}

	topItemsExternal(){
		this._method="topitemsexternal";
	}

	bestRated(timeFrame=5){
		this._method="bestrated";
		this.getParameters().set("timeframe",timeFrame);
	}

	mostLiked(timeFrame=5){
		this._method="mostliked";
		this.getParameters().set("timeframe",timeFrame);
	}

	mostReacted(timeFrame=5){
		this._method="mostreacted";
		this.getParameters().set("timeframe",timeFrame);
	}

	mostCommented(timeFrame=5){
		this._method="mostcommented";
		this.getParameters().set("timeframe",timeFrame);
	}

	channelOverview(){
		this._method="channeloverview";
	}

	formatOverview(){
		this._method="formatoverview";
	}

	commentsFor(id){
		this._method="commentsfor/"+id;
	}

	externalCommentsFor(id){
		this._method="externalcommentsfor/"+id;
	}

	currentViewsFor(id){
		this._method="currentviewsfor/"+id;
	}

	recommendationsFor(id){
		this._method="recommendationsfor/"+id;
	}

	recommendationsForContext(context,content,language,title,subtitle){
		this._method="recommendationsforcontext/"+context;
		if(content){
            this._verb=defaults.VERB_POST;
			this.getParameters().set("content",content);
            if(title){
                this.getParameters().set("title",title);
            }
            if(subtitle){
                this.getParameters().set("subtitle",subtitle);
            }
		}
		if((language)&&(language.length==2)){
			this.getParameters().set("language",language);
		}
	}

	similarsFor(id){
		this._method="similarsfor/"+id;
	}

	textTrackDataFor(id,role=captionroles.SUBTITLES){
		this.#verifyParameter("texttrackdatafor",id,[streamtypes.VIDEO,streamtypes.AUDIO,streamtypes.ALLMEDIA]);
		if(role){
			this.getParameters().set("role",role);
		}
	}

	stitchedManifestFor(id){
		this.#verifyParameter("stitchedmanifestfor",id,[streamtypes.PLAYLIST,streamtypes.SET,streamtypes.COLLECTION,streamtypes.ALLMEDIA]);
	}

	byQuery(query,queryMode=querymodes.FULLTEXT,queryFields="",minimalQueryScore=0,includeSubsctringMatches=false,skipReporting=false){
		if(query){
			this._method="byquery/"+encodeURIComponent(query);
			this.getParameters().set("queryMode",queryMode);
			if(queryFields){
				this.getParameters().set("queryFields",queryFields);
			}
			if(queryMode==querymodes.FULLTEXT){
				if(minimalQueryScore>0){
					this.getParameters().set("minimalQueryScore",minimalQueryScore);
				}
			}else if(includeSubsctringMatches){
				this.getParameters().set("includeSubstringMatches",1);
			}
			if(skipReporting){
				this.getParameters().set("skipReporting",1);
			}
		}else{
            throw new Error("Query cant be empty");
        }
	}

	byGeo(geoQuery,geoMode=geoquerymodes.PLACE,distance=10){
		if(geoQuery){
            if(geoquerymodes.getAllTypes().includes(geoMode)){
			    this._method="bygeo/"+encodeURIComponent(geoQuery);
			    this.getParameters().set("geoMode",geoMode);
			    this.getParameters().set("distance",distance);
            }else{
                throw new Error("GeoMode is not supported");
            }
		}else{
            throw new Error("Query cant be empty");
        }
	}

	byItemList(items){
		if((items)&&(items.length)&&(items.length>0)){
			this._method="byitemlist/"+items.join(',');
		}else{
            throw new Error("items must be a non-empty Array");
        }
	}

	byStudio(studio){
		this._method="bystudio/"+studio;
	}

	byGenre(genre){
		this._method="bygenre/"+genre;
	}

	byTag(name,id){
		if(name){
			this._method="bytag/"+encodeURIComponent(name);
		}else if(id){
			this._method="bytagid/"+id;
		}
	}

	byPerson(name,id){
		if(name){
			this._method="byperson/"+encodeURIComponent(name);
		}else if(id){
			this._method="bypersonid/"+id;
		}
	}

	byGroup(name,id){
		if(name){
			this._method="bygroup/"+encodeURIComponent(name);
		}else if(id){
			this._method="bygroupid/"+id;
		}
	}

	byShow(name,id){
		if(name){
			this._method="byshow/"+encodeURIComponent(name);
		}else if(id){
			this._method="byshowid/"+id;
		}
	}

	byPlace(name,id){
		if(name){
			this._method="byplace/"+encodeURIComponent(name);
		}else if(id){
			this._method="byplaceid/"+id;
		}
	}

	byProduct(name,id){
		if(name){
			this._method="byproduct/"+encodeURIComponent(name);
		}else if(id){
			this._method="byproductid/"+id;
		}
	}

	byFile(name,id){
		if(name){
			this._method="byfile/"+encodeURIComponent(name);
		}else if(id){
			this._method="byfileid/"+id;
		}
	}

	byUser(userid){
		this._method="byuser/"+userid;
	}

	byPlaylist(playlistid){
		this.#verifyParameter("byplaylist",playlistid,[streamtypes.VIDEO]);
	}

	byLiveConnection(liveConnectionID){
		this.#verifyParameter("byliveconnection",liveConnectionID,[streamtypes.VIDEO]);
	}

	byAudioAlbum(albumid){
		this.#verifyParameter("byaudioalbum",albumid,[streamtypes.AUDIO]);
	}

	byAlbum(albumid){
		this.#verifyParameter("byalbum",albumid,[streamtypes.IMAGE]);
	}

	byFolder(folderid){
		this.#verifyParameter("byfolder",folderid,[streamtypes.FILE]);
	}

	byMagazine(magazineid){
		this.#verifyParameter("bymagazine",magazineid,[streamtypes.ARTICLE]);
	}

	byRack(rackid){
		this.#verifyParameter("byrack",rackid,[streamtypes.VIDEO,streamtypes.LIVE,streamtypes.SCENE]);
	}

	byVariant(variantid){
		this.#verifyParameter("byvariant",variantid,[streamtypes.VIDEO]);
	}

	byVideo(videoid){
		this.#verifyParameter("byvideo",videoid,[streamtypes.SCENE]);
	}

	byConnectedToItem(itemid,streamtype){
		this.#verifyParameter("linktedtoitem",0,[streamtypes.PLACE,streamtypes.LINK,streamtypes.SHOW,streamtypes.PERSON,streamtypes.FILE,streamtypes.PRODUCT],true);
		if(!itemid){
			throw new Error("ItemID cant be empty");
		}else if(!streamtype){
			throw new Error("Item Streamtypes cant be empty");
		}else{
			this.getParameters().set("item",itemid);
			this.getParameters().set("streamtype",streamtype);
		}
	}

	today(){
		this.#verifyParameter("today",0,[streamtypes.EVENT],TRUE);
	}

	thisWeek(){
		this.#verifyParameter("thisweek",0,[streamtypes.EVENT],TRUE);
	}

	thisMonth(){
		this.#verifyParameter("thismonth",0,[streamtypes.EVENT],TRUE);
	}

	nextDays(days){
		this.getParameters().set('days',days);
		this.#verifyParameter("nextdays",0,[streamtypes.EVENT],TRUE);
	}

	nextInSeries(videoid){
		this.#verifyParameter("nextinseries",videoid,[streamtypes.VIDEO]);
	}

	latestOpen(){
		this.#verifyParameter("latestopen",0,[streamtypes.POLL,streamtypes.VOTING],true);
	}

	userHistory(excludeCompleted){
		this._method="userhistory";
		if(excludeCompleted){
			this.getParameters().set("excludeCompleted",1);
		}
	}

	userFavourites(){
		this._method="userfavourites";
	}

	userLikes(){
		this._method="userlikes";
	}

	userRatings(){
		this._method="userratings";
	}

	userReactions(){
		this._method="userreactions";
	}

	userComments(){
		this._method="usercomments";
	}

	userUploads(){
		this._method="useruploads";
	}

}

module.exports={MediaCall};