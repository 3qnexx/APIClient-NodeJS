"use strict";

const {APICall}=require("../internals/apicall");
const tools=require("../internals/tools");
const defaults=require("../enums/defaults");
const streamtypes=require("../enums/streamtypes");
const exportparts=require("../enums/exportparts");
const externalstates=require("../enums/externalstates");
const autoorderattributes=require("../enums/autoorderattributes");
const rejectactions=require("../enums/rejectactions");
const contentmoderationaspects=require("../enums/contentmoderationaspects");
const scenepurposes=require("../enums/scenepurposes");
const livestreamtypes=require("../enums/livestreamtypes");
const livesourcetypes=require("../enums/livesourcetypes");
const highlightvideopurposes=require("../enums/highlightvideopurposes");
const topicitemsources=require("../enums/topicitemsources");
const querymodes=require("../enums/querymodes");
const externalplatforms=require("../enums/externalplatforms");
const externalplatformcontexts=require("../enums/externalplatformcontexts");
const liveplaybackstates=require("../enums/liveplaybackstates");
const awardstates=require("../enums/awardstates");
const hotspottypes=require("../enums/hotspottypes");
const texttrackroles=require("../enums/texttrackroles");

class MediaManagementCall extends APICall{

	#streamtype="";
	#method="";
	#item=0;

	constructor(){
		super();
	}


	getPath(){
		this._path="manage/"+streamtypes.getPluralizedStreamtype(this.#streamtype)+"/"+(this.#item>0?this.#item+"/":"")+this.#method;
		return(super.getPath());
	}

	setStreamtype(streamtype){
		if(streamtypes.getAllTypes().includes(streamtype)){
			this.#streamtype=streamtype;
		}else{
			throw new Error("Streamtype not supported");
		}
	}

	setItem(item=0,streamtype=""){
		if(streamtype){
			this.setStreamtype(streamtype);
		}
		if(item>0){
			this.#item=item;
		}
	}

	#handleCover(method,url="",description="",assetLanguage="",fromTime=0){
		if(url.startsWith("http")){
			this._verb=defaults.VERB_POST;
			this.#method=method;
			this.getParameters().set("url",url);
			if(description){
				this.getParameters().set("description",description);
			}
			if(assetLanguage){
				this.getParameters().set("assetLanguage",assetLanguage);
			}
		}else if((fromTime>0)&&(in_array(this.#streamtype,[streamtypes.VIDEO,streamtypes.SCENE,'variant']))){
			this._verb=defaults.VERB_POST;
			this.#method=method;
			this.getParameters().set("fromTime",fromTime);
		}else{
			throw new Error("a valid Cover URL or TimeStamp (on Video Streamtypes only).");
		}
	}

	createFromURL(url, useQueue=true, autoPublish=null, refnr="",queueStart=0, asVariantFor="", asVariantOf=0, sourceLanguage="", notes=""){
		if(streamtypes.getUploadableTypes().includes(this.#streamtype)){
			if(url.startsWith("http")){
				this._verb=defaults.VERB_POST;
				this.#method="fromurl";
				this.getParameters().set("url",url);
				if(refnr){
					this.getParameters().set("refnr",refnr);
				}
				if(notes){
					this.getParameters().set("notes",notes);
				}
				if(useQueue){
					this.getParameters().set("useQueue",1);
					if(queueStart>0){
						this.getParameters().set("queueStart",queueStart);
					}
				}
				if(autoPublish!==null){
					this.getParameters().set('autoPublish',(autoPublish?1:0));
				}
				if((this.#streamtype==streamtypes.VIDEO)||(this.#streamtype==streamtypes.AUDIO)){
					if(sourceLanguage.length==2){
						this.getParameters().set("language",sourceLanguage);
					}
				}
				if(this.#streamtype==streamtypes.VIDEO){
					if(asVariantOf>0){
						this.getParameters().set("asVariantOf",asVariantOf);
					}
					if(asVariantFor){
						if(externalplatforms.getAllTypes().includes(asVariantFor)){
							this.getParameters().set("asVariantFor",asVariantFor);
						}
					}
				}
			}else{
				throw new Error("URL must start with HTTP");
			}
		}else{
			throw new Error("Streamtype must be in "+implode(", ",streamtypes.getUploadableTypes()));
		}
	}

	createFromData(title,refnr="",codename="",autoPublish=null,personGender="",personType=""){
		if(!streamtypes.getUploadableTypes().includes(this.#streamtype)){
			if((!codename)||(!streamtypes.getContainerTypes().includes(this.#streamtype))){
				this._verb=defaults.VERB_POST;
				this.#method="fromdata";
				if(title){
					if([streamtypes.PERSON,streamtypes.GROUP].includes(this.#streamtype)){
						this.getParameters().set('artistname',title);
						if(personGender){
							if(['m','f','n'].includes(personGender)){
								this.getParameters().set('gender',personGender);
							}else{
								throw new Error("valid Genders are m, f and n.");
							}
						}
						if(personType){
							this.getParameters().set('type',personType);
						}
					}else{
						this.getParameters().set('title',title);
					}
					if(refnr){
						this.getParameters().set("refnr",refnr);
					}
					if(codename){
						this.getParameters().set("codename",refnr);
					}
					if(autoPublish!==null){
						this.getParameters().set("autoPublish",(autoPublish?1:0));
					}
				}else{
					throw new Error("Title cant be empty");
				}
			}else{
				throw new Error("Container Streamtypes need a valid Codename");
			}
		}else{
			throw new Error("Streamtype cannot be in "+streamtypes.getUploadableTypes().join(","));
		}
	}

	createFromTopic(title, topic="", itemSource="",duration=0,itemCount=0, searchMode="", searchFields=[], channel=0, format=0, category =0){
		if(streamtypes.getSimpleContainerTypes().includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="fromtopic";
			if(title){
				this.getParameters().set("title",title);
			}else{
				throw new Error("title cant be empty");
			}
			let isSearch=false;
			if(topic){
				isSearch=true;
				if((searchFields)&&(Array.isArray(searchFields))&&(searchFields.length>0)){
					this.getParameters().set("searchFields",searchFields.join(","));
				}
				if(querymodes.getAllTypes().includes(searchMode)){
					this.getParameters().set("searchMode",searchMode);
				}
			}
			if([streamtypes.ALBUM,streamtypes.MAGAZINE].includes(this.#streamtype)){
				if(itemCount==0){
					throw new Error("this streamtype requires a valid itemCount.");
				}else{
					this.getParameters().set("items",itemCount);
				}
			}else{
				if(duration==0){
					throw new Error("this streamtype requires a valid target Duration.");
				}else{
					this.getParameters().set("duration",duration);
				}
			}
			if((!isSearch)&&(!itemSource)){
				throw new Error("if no topic is given, an itemSource is necessary.");
			}else if(topicitemsources.includes(itemSource)){
				this.getParameters().set("itemSource",itemSource);
			}else{
				throw new Error("if no topic is given, a valid itemSource is necessary.");
			}
			if(channel>0){
				this.getParameters().set("channel",channel);
			}
			if(format>0){
				this.getParameters().set("format",format);
			}
			if(category>0){
				this.getParameters().set("category",category);
			}
		}else{
			throw new Error("Streamtype must be in "+streamtypes.getSimpleContainerTypes().join(","));
		}
	}

	createHighlightVideoFromVideo(videoID,duration,includeAudio=true,purpose=""){
		if(videoID>0){
			this.setStreamtype(streamtypes.VIDEO);
			this._verb=defaults.VERB_POST;
			this.#method="fromvideo/"+videoID;
			if(duration>0){
				this.getParameters().set("duration",duration);
			}else{
				throw new Error("a Duration must be given.");
			}
			if(includeAudio){
				this.getParameters().set("includeAudio",1);
			}
			if(highlightvideopurposes.getAllTypes().includes(purpose)){
				this.getParameters().set("purpose",purpose);
			}
		}else{
			throw new Error("the Video ID must be given.");
		}
	}

	createLiveStreamFromLiveConnection(liveConnectionID=0,title="",type=livestreamtypes.EVENT){
		if(liveConnectionID>0){
			this.setStreamtype(streamtypes.LIVE);
			this._verb=defaults.VERB_POST;
			this.#method="fromliveconnection/"+liveConnectionID;
			if(title){
				this.getParameters().set("title",title);
			}
			if(livestreamtypes.getAllTypes().includes(type)){
				this.getParameters().set("type",type);
			}
		}else{
			throw new Error("the LiveConnection ID must be given.");
		}
	}

	createLiveStreamFromAutoLiveConnection(title="",type=livestreamtypes.EVENT,sourceType=livesourcetypes.RTMP,enableDVR=false){
		this.setStreamtype(streamtypes.LIVE);
		this._verb=defaults.VERB_POST;
		this.#method="fromautoliveconnection";
		if(title){
			this.getParameters().set("title",title);
		}
		if(sourceType){
			if(livesourcetypes.getAllTypes().includes(sourceType)){
				this.getParameters().set("sourceType",type);
			}
		}
		if(enableDVR){
			this.getParameters().set("enableDVR",1);
		}
		if(livestreamtypes.getAllTypes().includes(type)){
			this.getParameters().set("type",type);
		}
	}

	createLiveStreamFromRemote(hlsURL,dashURL="",title="",type=livestreamtypes.EVENT){
		if((hlsURL)&&(hlsURL.startsWith("http"))){
			this.setStreamtype(streamtypes.LIVE);
			this._verb=defaults.VERB_POST;
			this.#method="fromremote";
			this.getParameters().set("hlsURL",hlsURL);
			if((dashURL)&&(dashURL.startsWith("http"))){
				this.getParameters().set("dashURL",dashURL);
			}
			if(title){
				this.getParameters().set("title",title);
			}
			if(livestreamtypes.getAllTypes().includes(type)){
				this.getParameters().set("type",type);
			}
		}else{
			throw new Error("a valid HLS URL must be given.");
		}
	}

	createRadioFromLiveConnection(liveConnectionID=0,title="",type=livestreamtypes.EVENT){
		if(liveConnectionID>0){
			this.setStreamtype(streamtypes.RADIO);
			this._verb=defaults.VERB_POST;
			this.#method="fromliveconnection/"+liveConnectionID;
			if(title){
				this.getParameters().set("title",title);
			}
			if(livestreamtypes.getAllTypes().includes(type)){
				this.getParameters().set("type",type);
			}
		}else{
			throw new Error("the LiveConnection ID must be given.");
		}
	}

	createRadioFromAutoLiveConnection(title="",type=livestreamtypes.EVENT){
		this.setStreamtype(streamtypes.RADIO);
		this._verb=defaults.VERB_POST;
		this.#method="fromautoliveconnection";
		if(title){
			this.getParameters().set("title",title);
		}
		if(livestreamtypes.getAllTypes().includes(type)){
			this.getParameters().set("type",type);
		}
	}

	createRadioFromRemote(url,title="",type=livestreamtypes.EVENT){
		if((url)&&(url.startsWith('http'))){
			this.setStreamtype(streamtypes.RADIO);
			this._verb=defaults.VERB_POST;
			this.#method="fromremote";
			this.getParameters().set("url",url);
			if(title){
				this.getParameters().set("title",title);
			}
			if(livestreamtypes.getAllTypes().includes(type)){
				this.getParameters().set("type",type);
			}
		}else{
			throw new Error("a valid URL must be given.");
		}
	}

	createSceneFromVideo(videoID=0,title="",from=0,until=0,purpose=scenepurposes.CHAPTER){
		if(videoID>0){
			this.setStreamtype(streamtypes.SCENE);
			this._verb=defaults.VERB_POST;
			this.#method="fromvideo/"+videoID;
			this.getParameters().set("from",from);
			if(until>0){
				this.getParameters().set("until",until);
			}else{
				throw new Error("a valid end time for the Scene must be given");
			}
			if(title){
				this.getParameters().set("title",title);
			}
			if(scenepurposes.getAllTypes().includes(purpose)){
				this.getParameters().set("purpose",purpose);
			}
		}else{
			throw new Error("the Video ID must be given.");
		}
	}

	createAudioFromVideo(videoID=0){
		if(videoID>0){
			this.setStreamtype(streamtypes.AUDIO);
			this._verb=defaults.VERB_POST;
			this.#method="fromvideo/"+videoID;
		}else{
			throw new Error("the Video ID must be given.");
		}
	}

	createAudioFromCaption(captionID=0){
		if(captionID>0){
			this.setStreamtype(streamtypes.AUDIO);
			this._verb=defaults.VERB_POST;
			this.#method="fromcaption/"+captionID;
		}else{
			throw new Error("the Caption ID must be given.");
		}
	}

	createAudioFromText(textcontent, title="", subtitle="", teaser="", language="",voice=""){
		if(textcontent){
			this.setStreamtype(streamtypes.AUDIO);
			this._verb=defaults.VERB_POST;
			this.#method="fromtext";
			this.getParameters().set("textcontent",textcontent);
			if(language.length==2){
				this.getParameters().set("language",language);
			}
			if(title){
				this.getParameters().set("title",title);
			}
			if(subtitle){
				this.getParameters().set("subtitle",subtitle);
			}
			if(teaser){
				this.getParameters().set("teaser",teaser);
			}
			if(voice){
				this.getParameters().set("voice",voice);
			}
		}else{
			throw new Error("a non-empty Text must be given.");
		}
	}

	createImageFromVideo(videoID=0,from=0,until=0,title="",useAsCover=false){
		if(videoID>0){
			this.setStreamtype(streamtypes.IMAGE);
			this._verb=defaults.VERB_POST;
			this.#method="fromvideo/"+videoID;
			if(from>0){
				this.getParameters().set("from",from);
			}
			if(until>0){
				this.getParameters().set("until",until);
			}
			if(title){
				this.getParameters().set("title",title);
			}
			if(useAsCover){
				this.getParameters().set("useAsCover",1);
			}
		}else{
			throw new Error("the Video ID must be given.");
		}
	}

	createPostFromText(accountID=0,postText="",postImage=0){
		if(accountID>0){
			this.setStreamtype(streamtypes.POST);
			this._verb=defaults.VERB_POST;
			this.#method="fromtext";
			this.getParameters().set("account",accountID);
			if(postText){
				this.getParameters().set("postText",postText);
			}else{
				throw new Error("the Posting Text cant be empty.");
			}
			if(postImage>0){
				this.getParameters().set("postImage",postImage);
			}
		}else{
			throw new Error("the Account ID must be given.");
		}
	}

	updateItemFile(url){
		if(streamtypes.getUploadableTypes().includes(this.#streamtype)){
			if(url.startsWith("http")){
				this._verb=defaults.VERB_PUT;
				this.#method="updatefile";
				this.getParameters().set("url",url);
			}else{
				throw new Error("URL must start with HTTP");
			}
		}else{
			throw new Error("Streamtype must be in "+streamtypes.getUploadableTypes().join(","));
		}
	}

	updateItemMetaData(attributes={}){
		this._verb=defaults.VERB_PUT;
		this.#method="update";
		for (let [key, value] of Object.entries(attributes)){
			if(!value){
				value="";
			}else if(Array.isArray(value)){
				value="";
			}
			this.getParameters().set(key,value);
		}
	}

	updateItemRestrictions(restrictions={}){
		this._verb=defaults.VERB_PUT;
		this.#method="updaterestrictions";
		for (let [key, value] of Object.entries(restrictions)){
			if(!value){
				value="";
			}else if(Array.isArray(value)){
				value="";
			}
			this.getParameters().set(key,value);
		}
	}

	updateAudioContent(textcontent='',title='',subtitle='',teaser='',language='',voice=''){
		this.setStreamtype(streamtypes.AUDIO);
		this._verb=defaults.VERB_PUT;
		this.#method="updatecontent";
		if(textcontent){
			this.getParameters().set('textcontent',textcontent);
		}
		if(title){
			this.getParameters().set('title',title);
		}
		if(subtitle){
			this.getParameters().set('subtitle',subtitle);
		}
		if(teaser){
			this.getParameters().set('teaser',teaser);
		}
		if(language){
			this.getParameters().set('language',language);
		}
		if(voice){
			this.getParameters().set('voice',voice);
		}
	}

	updateAudioRepresentation(includeTitle=false,includeSubtitle=false,includeTeaser=false,includeFragments=false){
		this.setStreamtype(streamtypes.ARTICLE);
		this._verb=defaults.VERB_PUT;
		this.#method="updateaudiorepresentation";
		if(includeTitle){
			this.getParameters().set('includeTitle',1);
		}
		if(includeSubtitle){
			this.getParameters().set('includeSubtitle',1);
		}
		if(includeTeaser){
			this.getParameters().set('includeTeaser',1);
		}
		if(includeFragments){
			this.getParameters().set('includeFragments',1);
		}
	}

	approveItem(reason,restrictToAge=0,contentModerationAspects=[]){
		this._verb=defaults.VERB_POST;
		this.#method="approve";
		if(reason){
			this.getParameters().set("reason",reason);
		}
		if(ageclasses.getAllTypes().includes(restrictToAge)){
			this.getParameters().set("restrictToAge",restrictToAge);
		}
		if((contentModerationAspects)&&(Array.isArray(contentModerationAspects))&&(contentModerationAspects.length>0)){
			cm=[];
			contentModerationAspects.forEach(function(cma){
				if(contentmoderationaspects.getAllTypes().includes(cma)){
					cm.push(cma);
				}
			});
			if(cm.length>0){
				this.getParameters().set("contentModerationAspects",cm.join(","));
			}
		}
	}

	rejectItem(reason="",action=""){
		this._verb=defaults.VERB_POST;
		this.#method="reject";
		if(reason){
			this.getParameters().set("reason",reason);
		}
		if(action){
			if(rejectactions.getAllTypes().includes(action)){
				this.getParameters().set("action",action);
			}
		}
	}

	publishItem(){
		this._verb=defaults.VERB_PUT;
		this.#method="publish";
	}

	unpublishItem(blockFuturePublishing=null){
		this._verb=defaults.VERB_PUT;
		this.#method="unpublish";
		if(blockFuturePublishing!==null){
			this.getParameters().set("blockFuturePublishing",(blockFuturePublishing?1:0));
		}
	}

	unblockItem(){
		this._verb=defaults.VERB_PUT;
		this.#method="unblock";
	}

	pickItem(index=1){
		this._verb=defaults.VERB_PUT;
		this.#method="pick";
		this.getParameters().set("index",index);
	}

	unpickItem(){
		this._verb=defaults.VERB_PUT;
		this.#method="unpick";
	}

	setItemAsNew(){
		this._verb=defaults.VERB_PUT;
		this.#method="setasnew";
	}

	removeItem(){
		this._verb=defaults.VERB_DELETE;
		this.#method="remove";
	}

	transferItemToDomain(targetDomain=0,andDeleteOriginal=false){
		if(targetDomain>0){
			this._verb=defaults.VERB_POST;
			this.#method="transfertodomain/"+targetDomain;
			if(andDeleteOriginal){
				this.getParameters().set("andDeleteOriginal",1);
			}
		}else{
			throw new Error("A target Domain must be given");
		}
	}

	reorderItem(itemlist=[],autoOrder="",autoOrderDirection=""){
		if(streamtypes.getContainerTypes().includes(this.#streamtype)){
			this._verb=defaults.VERB_PUT;
			this.#method="reorder";
			if((itemlist)&&(Array.isArray(itemlist))&&(itemlist.length>0)){
				this.getParameters().set("itemlist",itemlist.join(","));
			}else if((autoOrder)&&(autoorderattributes.getAllTypes().includes(autoOrder))){
				this.getParameters().set("autoorder",autoOrder);
				if(["ASC","DESC"].includes(autoOrderDirection)){
					this.getParameters().set("autoorderdirection",autoOrderDirection);
				}
			}else{
				throw new Error("an itemlist or a valid autoOrder must be given");
			}
		}else{
			throw new Error("only Container Elements can be reordered.");
		}
	}

	reencodeItem(reason=""){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="reencode";
			if(reason){
				this.getParameters().set("reason",reason);
			}
		}else{
			throw new Error("Streamtype must be in video, audio");
		}
	}

	analyzeItemDetails(){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="analyzedetails";
		}else{
			throw new Error("Streamtype must be in video, audio");
		}
	}

	archiveItem(){
		if([streamtypes.VIDEO].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="archive";
		}else{
			throw new Error("Streamtype must be video");
		}
	}

	terminateStream(){
		if([streamtypes.LIVE].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="terminate";
		}else{
			throw new Error("Streamtype must be live");
		}
	}

	updatePlaybackState(state){
		if([streamtypes.LIVE].includes(this.#streamtype)){
			if(liveplaybackstates.getAllTypes().includes(state)){
				this._verb=defaults.VERB_POST;
				this.#method="updateplaybackstate";
				this.getParameters().set('state',state);
			}else{
				throw new Error("Live PlaybackState must be in on,pause");
			}
		}else{
			throw new Error("Streamtype must be live");
		}
	}

	startRecording(){
		if([streamtypes.LIVE].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="startrecording";
		}else{
			throw new Error("Streamtype must be live");
		}
	}

	stopRecording(){
		if([streamtypes.LIVE].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="stoprecording";
		}else{
			throw new Error("Streamtype must be live");
		}
	}

	exportItem(accountID,externalCategory="",externalState=externalstates.PUBLIC, postText="",publicationDate=0,inVariant=0,list=0, platformContext=""){
		if(accountID>0){
			if(streamtypes.getExportableTypes().includes(this.#streamtype)){
				this._verb=defaults.VERB_POST;
				this.#method="export";
				this.getParameters().set("account",accountID);
				if(list){
					this.getParameters().set("list",list);
				}
				if(externalCategory){
					this.getParameters().set("externalCategory",externalCategory);
				}
				if(externalstates.getExportableTypes().includes(externalState)){
					this.getParameters().set("externalState",externalState);
				}
				if((publicationDate>0)&&(externalState==externalstates.PRIVATE)){
					this.getParameters().set("publicationDate",publicationDate);
				}
				if((this.#streamtype==streamtypes.VIDEO)&&(platformContext!="")&&(externalplatformcontexts.getAllTypes.includes(platformContext))){
					this.getParameters().set("platformContext",platformContext);
				}
				if((this.#streamtype==streamtypes.VIDEO)&&(inVariant>0)){
					this.getParameters().set("inVariant",inVariant);
				}else if((this.#streamtype==streamtypes.ARTICLE)&&(postText)){
					this.getParameters().set("postText",postText);
				}
			}else{
				throw new Error("this streamtype is not supported.");
			}
		}else{
			throw new Error("the ID of the Account must be given.");
		}
	}

	exportItemAsPost(accountID,postURL="",postText="",postImage="",postWithLink=false){
		if(accountID>0){
			if(streamtypes.getExportableTypes().includes(this.#streamtype)){
				this._verb=defaults.VERB_POST;
				this.#method="exportaspost";
				this.getParameters().set("account",accountID);
				if(postURL){
					this.getParameters().set("postURL",postURL);
				}
				if(postText){
					this.getParameters().set("postText",postText);
				}
				if(postImage){
					this.getParameters().set("postImage",postImage);
				}
				if((this.#streamtype==streamtypes.ARTICLE)&&(postWithLink)){
					this.getParameters().set("postWithLink",1);
				}
			}else{
				throw new Error("this streamtype is not supported.");
			}
		}else{
			throw new Error("the ID of the Account must be given.");
		}
	}

	updateItemExport(externalReference="",exportID=0,partToUpdate=""){
		this._verb=defaults.VERB_PUT;
		this.#method="updateexport";
		if(exportparts.getAllTypes().includes(partToUpdate)){
			this.getParameters().set("partToUpdate",partToUpdate);
		}else{
			throw new Error("the partToUpdate Parameter must be one of "+exportparts.getAllTypes().join(","));
		}
		if(externalReference){
			this.getParameters().set("externalReference",externalReference);
		}else if(exportID>0){
			this.getParameters().set("item",exportID);
		}else{
			throw new Error("the target Export must be given by internal or external Reference");
		}
	}

	deleteItemExport(externalReference="",exportID=0){
		this._verb=defaults.VERB_DELETE;
		this.#method="removeexport";
		if(externalReference){
			this.getParameters().set("externalReference",externalReference);
		}else if(exportID>0){
			this.getParameters().set("item",exportID);
		}else{
			throw new Error("the target Export must be given by internal or external Reference");
		}
	}

	addItemPreviewLink(title,language="",maxStarts=0,code="",showAnnotations=true,allowAnnotations=true,allowSnapshots=false,allowSourceDownloads=false,useDomainStyle=false){
		if(streamtypes.getPlayerTypes().includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="addpreviewlink";

			this.getParameters().set("title",title);

			if(language.length==2){
				this.getParameters().set("language",language);
			}
			if(maxStarts>0){
				this.getParameters().set("maxStarts",maxStarts);
			}
			if(code){
				this.getParameters().set("code",code);
			}
			if(showAnnotations){
				this.getParameters().set("showAnnotations",1);
			}
			if(allowAnnotations){
				this.getParameters().set("allowAnnotations",1);
			}
			if(allowSnapshots){
				this.getParameters().set("allowSnapshots",1);
			}
			if(allowSourceDownloads){
				this.getParameters().set("allowSourceDownloads",1);
			}
			if(useDomainStyle){
				this.getParameters().set("useDomainStyle",1);
			}
		}else{
			throw new Error("Streamtype must be in "+streamtypes.getPlayerTypes().join(","));
		}
	}

	deleteItemPreviewLink(previewlinkID=0){
		if(previewlinkID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removepreviewlink/"+previewlinkID;
		}else{
			throw new Error("the ID of the PreviewLink must be given.");
		}
	}

	addItemDownloadLink(title,language="",maxStarts=0,code="",useDomainStyle=false){
		if(streamtypes.getUploadableTypes().includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="adddownloadlink";

			this.getParameters().set("title",title);

			if(language.length==2){
				this.getParameters().set("language",language);
			}
			if(maxStarts>0){
				this.getParameters().set("maxStarts",maxStarts);
			}
			if(code){
				this.getParameters().set("code",code);
			}
			if(useDomainStyle){
				this.getParameters().set("useDomainStyle",1);
			}
		}else{
			throw new Error("Streamtype must be in "+streamtypes.getUploadableTypes().join(","));
		}
	}

	deleteItemDownloadLink(downloadlinkID=0){
		if(downloadlinkID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removedownloadlink/"+downloadlinkID;
		}else{
			throw new Error("the ID of the DownloadLink must be given.");
		}
	}

	addItemToContainer(containerID=0){
		if(containerID>0){
			this._verb=defaults.VERB_POST;
			this.#method="addtocontainer/"+containerID;
		}else{
			throw new Error("the ID of the Container must be given.");
		}
	}

	addItemToCollection(collectionID=0){
		if(collectionID>0){
			this._verb=defaults.VERB_POST;
			this.#method="addtocollection/"+collectionID;
		}else{
			throw new Error("the ID of the Collection must be given.");
		}
	}

	addItemToSet(setID=0,purpose=''){
		if(setID>0){
			this._verb=defaults.VERB_POST;
			this.#method="addtoset/"+setID;
			if(purpose){
				this.getParameters().set("purpose",purpose);
			}
		}else{
			throw new Error("the ID of the Set must be given.");
		}
	}

	addItemToRack(rackID=0,purpose=''){
		if(rackID>0){
			this._verb=defaults.VERB_POST;
			this.#method="addtorack/"+rackID;
			if(purpose){
				this.getParameters().set("purpose",purpose);
			}
		}else{
			throw new Error("the ID of the Rack must be given.");
		}
	}

	addItemToBundle(bundleID=0){
		if(bundleID>0){
			this._verb=defaults.VERB_POST;
			this.#method="addtobundle/"+bundleID;
		}else{
			throw new Error("the ID of the Bundle must be given.");
		}
	}

	removeItemFromContainer(containerID=0){
		if(containerID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removefromcontainer/"+containerID;
		}else{
			throw new Error("the ID of the Container must be given.");
		}
	}

	removeItemFromCollection(collectionID=0){
		if(collectionID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removefromcollection/"+collectionID;
		}else{
			throw new Error("the ID of the Collection must be given.");
		}
	}

	removeItemFromSet(setID=0){
		if(setID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removefromset/"+setID;
		}else{
			throw new Error("the ID of the Set must be given.");
		}
	}

	removeItemFromRack(rackID=0){
		if(rackID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removefromrack/"+rackID;
		}else{
			throw new Error("the ID of the Rack must be given.");
		}
	}

	removeItemFromBundle(bundleID=0){
		if(bundleID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removefrombundle/"+bundleID;
		}else{
			throw new Error("the ID of the Bundle must be given.");
		}
	}

	connectLinkToItem(linkID=0){
		if(linkID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectlink/"+linkID;
		}else{
			throw new Error("the ID of the Link must be given.");
		}
	}

	connectFileToItem(fileID=0){
		if(fileID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectfile/"+fileID;
		}else{
			throw new Error("the ID of the File must be given.");
		}
	}

	connectPersonToItem(personID=0,purpose=''){
		if(personID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectperson/"+personID;
			if(purpose){
				this.getParameters().set("purpose",purpose);
			}
		}else{
			throw new Error("the ID of the Person must be given.");
		}
	}

	connectGroupToItem(groupID=0,purpose=''){
		if(groupID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectgroup/"+groupID;
			if(purpose){
				this.getParameters().set("purpose",purpose);
			}
		}else{
			throw new Error("the ID of the Group must be given.");
		}
	}

	connectShowToItem(showID=0){
		if(showID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectshow/"+showID;
		}else{
			throw new Error("the ID of the Show must be given.");
		}
	}

	connectPlaceToItem(placeID=0){
		if(placeID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectplace/"+placeID;
		}else{
			throw new Error("the ID of the Place must be given.");
		}
	}

	connectProductToItem(productID=0){
		if(productID>0){
			this._verb=defaults.VERB_PUT;
			this.#method="connectproduct/"+productID;
		}else{
			throw new Error("the ID of the Product must be given.");
		}
	}

	removeLinkFromItem(linkID=0){
		if(linkID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removelink/"+linkID;
		}else{
			throw new Error("the ID of the Link must be given.");
		}
	}

	removeFileFromItem(fileID=0){
		if(fileID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removefile/"+fileID;
		}else{
			throw new Error("the ID of the File must be given.");
		}
	}

	removePersonFromItem(personID=0){
		if(personID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removeperson/"+personID;
		}else{
			throw new Error("the ID of the Person must be given.");
		}
	}

	removeGroupFromItem(groupID=0){
		if(groupID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removegroup/"+groupID;
		}else{
			throw new Error("the ID of the Group must be given.");
		}
	}

	removeShowFromItem(showID=0){
		if(showID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removeshow/"+showID;
		}else{
			throw new Error("the ID of the Show must be given.");
		}
	}

	removePlaceFromItem(placeID=0){
		if(placeID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removeplace/"+placeID;
		}else{
			throw new Error("the ID of the Place must be given.");
		}
	}

	removeProductFromItem(productID=0){
		if(productID>0){
			this._verb=defaults.VERB_DELETE;
			this.#method="removeproduct/"+productID;
		}else{
			throw new Error("the ID of the Product must be given.");
		}
	}

	setItemCover(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("cover",url,description,assetLanguage,fromTime);
	}

	setItemCoverAlternative(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("alternativecover",url,description,assetLanguage,fromTime);
	}

	setItemCoverABTest(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("abtestalternative",url,description,assetLanguage,fromTime);
	}

	setItemCoverActionShot(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("actionshot",url,description,assetLanguage,fromTime);
	}

	setItemCoverQuad(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("quadcover",url,description,assetLanguage,fromTime);
	}

	setItemCoverBanner(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("banner",url,description,assetLanguage,fromTime);
	}

	setItemCoverFamilySafe(url="", description="",assetLanguage="",fromTime=0){
		this.#handleCover("familysafe",url,description,assetLanguage,fromTime);
	}

	setItemCoverArtwork(url=""){
		this.#handleCover("artwork",url,"",0);
	}

	addTextTrackFromURL(url="",language="",title="",role=texttrackroles.SUBTITLES){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(this.#streamtype)){
			if(url.startsWith("http")){
				this._verb=defaults.VERB_POST;
				this.#method="texttrackfromurl";
				this.getParameters().set("url",url);
				if(language.length==2){
					this.getParameters().set("language",language);
				}else{
					throw new Error("language must be given in 2-Letter-Code");
				}
				if(title){
					this.getParameters().set("title",title);
				}
				if(role){
					this.getParameters().set("role",role);
				}
			}else{
				throw new Error("a valid TextTrack URL is missing.");
			}
		}else{
			throw new Error("Streamtype must be in video,audio");
		}
	}

	addTextTrackFromSpeech(){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(this.#streamtype)){
			this._verb=defaults.VERB_POST;
			this.#method="texttrackfromspeech";
		}else{
			throw new Error("Streamtype must be in video,audio");
		}
	}

	translateTextTrackTo(targetLanguage="",role=texttrackroles.SUBTITLES){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(this.#streamtype)){
			if(language.length==2){
				this._verb=defaults.VERB_POST;
				this.#method="translatetexttrackto/"+targetLanguage;
				if(role){
					this.getParameters().set("role",role);
				}
			}else{
				throw new Error("Target Language must be given in 2-Letter-Code");
			}
		}else{
			throw new Error("Streamtype must be in video,audio");
		}
	}

	removeTextTrack(language="",role=texttrackroles.SUBTITLES){
		if([streamtypes.VIDEO,streamtypes.AUDIO].includes(this.#streamtype)){
			if(language.length==2){
				this._verb=defaults.VERB_DELETE;
				this.#method="removetexttrack";
				this.getParameters().set("language",language);
				if(role){
					this.getParameters().set("role",role);
				}
			}else{
				throw new Error("Language must be given in 2-Letter-Code");
			}
		}else{
			throw new Error("Streamtype must be in video,audio");
		}
	}

	translateMetadataTo(language){
		if(language.length==2){
			this._verb=defaults.VERB_POST;
			this.#method="translateto/"+language;
		}else{
			throw new Error("Language must be given in 2-Letter-Code");
		}
	}

	addTranslation(language,title="",subtitle="",teaser="",description="", orderhint=""){
		if(language.length==2){
			this._verb=defaults.VERB_POST;
			this.#method="addtranslation";
			this.getParameters().set("language",language);
			if(title){
				this.getParameters().set("title",title);
			}
			if(subtitle){
				this.getParameters().set("subtitle",subtitle);
			}
			if(teaser){
				this.getParameters().set("teaser",teaser);
			}
			if(description){
				this.getParameters().set((this.#streamtype==streamtypes.ARTICLE?"textcontent":"description"),description);
			}
			if(orderhint){
				this.getParameters().set("orderhint",orderhint);
			}
		}else{
			throw new Error("Language must be given in 2-Letter-Code");
		}
	}

	updateTranslation(language,title="",subtitle="",teaser="",description="", orderhint=""){
		if(language.length==2){
			this._verb=defaults.VERB_PUT;
			this.#method="updatetranslation";
			this.getParameters().set("language",language);
			if(title){
				this.getParameters().set("title",title);
			}
			if(subtitle){
				this.getParameters().set("subtitle",subtitle);
			}
			if(teaser){
				this.getParameters().set("teaser",teaser);
			}
			if(description){
				this.getParameters().set((this.#streamtype==streamtypes.ARTICLE?"textcontent":"description"),description);
			}
			if(orderhint){
				this.getParameters().set("orderhint",orderhint);
			}
		}else{
			throw new Error("Language must be given in 2-Letter-Code");
		}
	}

	removeTranslation(language){
		if(language.length==2){
			this._verb=defaults.VERB_DELETE;
			this.#method="removetranslation";
			this.getParameters().set("language",language);
		}else{
			throw new Error("Language must be given in 2-Letter-Code");
		}
	}

	addHotSpot(type,from,to, title,subtitle="",link="",detailTitle="",detailText="",autoPosition=true, xPos=0,yPos=0, maxWidth=0,linkedVideo=0,showCover=true,imageURL="",seekTarget=0){
		if((type)&&(hotspottypes.getAllTypes().includes(type))){
			this._verb=defaults.VERB_POST;
			this.#method="addhotspot";
			this.getParameters().set("type",type);
			if(from){
				this.getParameters().set("from",from);
			}
			if(to){
				this.getParameters().set("to",to);
			}
			if(title){
				this.getParameters().set("title",title);
			}
			if(autoPosition){
				this.getParameters().set("autoPosition",1);
			}else{
				this.getParameters().set("autoPosition",0);
				this.getParameters().set("xPos",xPos);
				this.getParameters().set("yPos",yPos);
			}
			if(type==hotspottypes.LINK){
				if(link){
					this.getParameters().set("link",link);
				}else{
					throw new Error("A HotSpot of Type 'link' must have a link Target");
				}
			}
			if(type==hotspottypes.VIDEO){
				if(linkedVideo){
					this.getParameters().set("linkedVideo",linkedVideo);
					this.getParameters().set("showCover",(showCover?1:0));
				}else{
					throw new Error("A HotSpot of Type 'video' must have a linkedVideo");
				}
			}
			if(type==hotspottypes.SEEK){
				if(seekTarget){
					this.getParameters().set("seekTarget",seekTarget);
				}else{
					throw new Error("A HotSpot of Type 'seek' must have a seekTarget");
				}
			}
			if(type==hotspottypes.BANNER){
				if(imageURL){
					this.getParameters().set("imageURL",imageURL);
					if(maxWidth){
						this.getParameters().set("maxWidth",maxWidth);
					}
					if(link){
						this.getParameters().set("link",link);
					}
				}else{
					throw new Error("A HotSpot of Type 'banner' must give an imageURL");
				}
			}
			if(type==hotspottypes.INTERSTITIAL){
				if(detailTitle){
					this.getParameters().set("detailTitle",detailTitle);
				}
				if(detailText){
					this.getParameters().set("detailText",detailText);
				}else{
					throw new Error("A HotSpot of Type 'interstitial' must have a detailText");
				}
			}else if(subtitle){
				this.getParameters().set("subtitle",subtitle);
			}
		}else{
			throw new Error("Type must be in "+hotspottypes.getAllTypes().join(", "));
		}
	}

	updateHotSpot(hotspotid,from=0,to=0, title="",subtitle="",link="",detailTitle="",detailText="",autoPosition=true, xPos=0,yPos=0, maxWidth=0,linkedVideo=0,showCover=true,imageURL="",seekTarget=0){
		if(hotspotid){
			this._verb=defaults.VERB_PUT;
			this.#method="updatehotspot";
			this.getParameters().set("hotspotid",hotspotid);
			if(from){
				this.getParameters().set("from",from);
			}
			if(to){
				this.getParameters().set("to",to);
			}
			if(title){
				this.getParameters().set("title",title);
			}
			if(subtitle){
				this.getParameters().set("subtitle",subtitle);
			}
			if(link){
				this.getParameters().set("link",link);
			}
			if(detailTitle){
				this.getParameters().set("detailTitle",detailTitle);
			}
			if(detailText){
				this.getParameters().set("detailText",detailText);
			}
			if(xPos){
				this.getParameters().set("xPos",xPos);
			}
			if(yPos){
				this.getParameters().set("yPos",yPos);
			}
			if(maxWidth){
				this.getParameters().set("maxWidth",maxWidth);
			}
			if(linkedVideo){
				this.getParameters().set("linkedVideo",linkedVideo);
			}
			if(imageURL){
				this.getParameters().set("imageURL",imageURL);
			}
			if(seekTarget){
				this.getParameters().set("seekTarget",seekTarget);
			}
			this.getParameters().set("autoPosition",(autoPosition?1:0));
			this.getParameters().set("showCover",(showCover?1:0));
		}else{
			throw new Error("HotSpot ID cant be empty");
		}
	}

	removeHotSpot(hotspotid){
		if(hotspotid){
			this._verb=defaults.VERB_DELETE;
			this.#method="removehotspot";
			this.getParameters().set("hotspotid",hotspotid);
		}else{
			throw new Error("HotSpot ID cant be empty");
		}
	}

	addAward(award,category="",date="",state=""){
		if(award){
			this._verb=defaults.VERB_POST;
			this.#method="addaward";
			this.getParameters().set("award",award);
			if(category){
				this.getParameters().set("category",category);
			}
			if(state){
				if(in_array(state,awardstates.getAllTypes())){
					this.getParameters().set("state",state);
				}else{
					throw new Error("state must be in "+awardstates.getAllTypes().join(', '));
				}
			}
			if(date){
				if(tools.dateIsValid(date)){
					this.getParameters().set("date",date);
				}else{
					throw new Error("Date must be in YYYY-MM-DD format");
				}
			}
		}else{
			throw new Error("Award cant be empty");
		}
	}

	updateAward(awardid,award,category="",date="",state=""){
		if(awardid){
			this._verb=defaults.VERB_PUT;
			this.#method="updateaward";
			this.getParameters().set("awardid",awardid);
			if(award){
				this.getParameters().set("award",award);
			}
			if(category){
				this.getParameters().set("category",category);
			}
			if(state){
				if(in_array(state,awardstates.getAllTypes())){
					this.getParameters().set("state",state);
				}else{
					throw new Error("state must be in "+awardstates.getAllTypes().join(','));
				}
			}
			if(date){
				if(tools.dateIsValid(date)){
					this.getParameters().set("date",date);
				}else{
					throw new Error("Date must be in YYYY-MM-DD format");
				}
			}
		}else{
			throw new Error("Award ID cant be empty");
		}
	}

	removeAward(awardid){
		if(awardid){
			this._verb=defaults.VERB_DELETE;
			this.#method="removeaward";
			this.getParameters().set("awardid",awardid);
		}else{
			throw new Error("Award ID cant be empty");
		}
	}

}

module.exports={MediaManagementCall};