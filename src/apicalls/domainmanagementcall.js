"use strict";

const {APICall}=require("../internals/apicall");
const defaults=require("../enums/defaults");
const streamtypes=require("../enums/streamtypes");
const networkmodes=require("../enums/networkmodes");

class DomainManagementCall extends APICall{

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

	#setStreamtype(streamtype){
		this.#streamtype=streamtype;
	}

	#setItem(item=0,streamtype=""){
		if(streamtype){
			this.#setStreamtype(streamtype);
		}
		if(item>0){
			this.#item=item;
		}
	}

	cloneForNetwork(title="",url="",networkmode=networkmodes.OWN,refnr=""){
		this.#setStreamtype("domain");
		this._verb=defaults.VERB_POST;
		this.#method="clonefornetwork";
		if(title){
			this.getParameters().set("title",title);
		}else{
			throw new Error("Title cant be empty");
		}
		if(url){
			this.getParameters().set("url",url);
		}else{
			throw new Error("URL cant be empty");
		}
		if(networkmodes.getAllTypes().includes(networkmode)){
			this.getParameters().set("networkmode",networkmode);
		}else{
			throw new Error("NetworkMode must be one of "+networkmodes.getAllTypes().join(","));
		}
		if(refnr){
			this.getParameters().set("refnr",refnr);
		}
	}

	markForDeletion(domainid=0){
		if(domainid>0){
			this.#setItem(domainid,"domain");
			this._verb=defaults.VERB_DELETE;
			this.#method="markfordeletion";
		}else{
			throw new Error("Domain ID cant be empty");
		}
	}

	addChannel(attributes={}){
		this.#setStreamtype("channel");
		this._verb=defaults.VERB_POST;
		this.#method="add";
		for (let [key, value] of Object.entries(attributes)){
			if(!value){
				value="";
			}else if(Array.isArray(value)){
				value="";
			}
			this.getParameters().set(key,value);
		}
	}

	updateChannel(channelID,attributes={}){
		if(channelID>0){
			this.#setItem(channelID,"channel");
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
		}else{
			throw new Error("Channel ID cant be empty");
		}
	}

	setChannelCover(channelID=0,url="", description=""){
		if(channelID){
			if(url){
				this.#setItem(formatID,"channel");
				this._verb=defaults.VERB_POST;
				this.#method="cover";
				if(description){
					this.getParameters().set("description",description);
				}
			}else{
				throw new Error("URL cant be empty");
			}
		}else{
			throw new Error("Channel ID cant be empty");
		}
	}

	setChannelCoverActionShot(channelID=0,url="", description=""){
		if(channelID){
			if(url){
				this.#setItem(formatID,"channel");
				this._verb=defaults.VERB_POST;
				this.#method="actionshot";
				if(description){
					this.getParameters().set("description",description);
				}
			}else{
				throw new Error("URL cant be empty");
			}
		}else{
			throw new Error("Channel ID cant be empty");
		}
	}

	removeChannel(channelID){
		if(channelID>0){
			this.#setItem(channelID,"channel");
			this._verb=defaults.VERB_DELETE;
			this.#method="remove";
		}else{
			throw new Error("Channel ID cant be empty");
		}
	}

	addFormat(attributes={}){
		this.#setStreamtype("format");
		this._verb=defaults.VERB_POST;
		this.#method="add";
		for (let [key, value] of Object.entries(attributes)){
			if(!value){
				value="";
			}else if(Array.isArray(value)){
				value="";
			}
			this.getParameters().set(key,value);
		}
	}

	updateFormat(formatID,attributes={}){
		if(formatID>0){
			this.#setItem(formatID,"format");
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
		}else{
			throw new Error("Format ID cant be empty");
		}
	}

	setFormatCover(formatID=0,url="", description=""){
		if(formatID){
			if(url){
				this.#setItem(formatID,"format");
				this._verb=defaults.VERB_POST;
				this.#method="cover";
				if(description){
					this.getParameters().set("description",description);
				}
			}else{
				throw new Error("URL cant be empty");
			}
		}else{
			throw new Error("Format ID cant be empty");
		}
	}

	setFormatCoverActionShot(formatID=0,url="", description=""){
		if(formatID){
			if(url){
				this.#setItem(formatID,"format");
				this._verb=defaults.VERB_POST;
				this.#method="actionshot";
				if(description){
					this.getParameters().set("description",description);
				}
			}else{
				throw new Error("URL cant be empty");
			}
		}else{
			throw new Error("Format ID cant be empty");
		}
	}

	removeFormat(formatID){
		if(formatID>0){
			this.#setItem(formatID,"format");
			this._verb=defaults.VERB_DELETE;
			this.#method="remove";
		}else{
			throw new Error("Format ID cant be empty");
		}
	}

	addUploadLink(title="",selectedStreamtypes=[],language="",maxUsages=0,code="",useDomainStyle=false){
		this.#setStreamtype("uploadlink");
		this._verb=defaults.VERB_POST;
		this.#method="add";
		if(title){
			this.getParameters().set("title",title);
		}else{
			throw new Error("Title cant be empty");
		}
		if((!Array.isArray(selectedStreamtypes))||(selectedStreamtypes.length==0)){
			throw new Error("At least one Streamtype must be selected");
		}else{
			arr=[];
			selectedStreamtypes.forEach(function(s){
				if(streamtypes.getUploadableTypes().includes(s)){
					arr.push(s);
				}		
			});
			if(arr.length>0){
				throw new Error("At least one valid Streamtype must be selected");
			}else{
				this.getParameters().set("selectedStreamtypes",arr.join(','));
			}
		}
		if(language.length==2){
			this.getParameters().set("language",language);
		}
		if(maxUsages>0){
			this.getParameters().set("maxUsages",maxUsages);
		}
		if(code){
			this.getParameters().set("code",code);
		}
		if(useDomainStyle){
			this.getParameters().set("useDomainStyle",1);
		}
	}

	deleteUploadLink(uploadLinkID=0){
		if(uploadLinkID>0){
			this.#setItem(uploadLinkID,"uploadlink");
			this._verb=defaults.VERB_DELETE;
			this.#method="remove";
		}else{
			throw new Error("UploadLink ID cant be empty");
		}
	}

	#addCategory(streamtype,attributes={}){
		this.#setStreamtype(streamtype+"category");
		this._verb=defaults.VERB_POST;
		this.#method="add";
		for (let [key, value] of Object.entries(attributes)){
			if(!value){
				value="";
			}else if(Array.isArray(value)){
				value="";
			}
			this.getParameters().set(key,value);
		}
	}

	#updateCategory(streamtype="",categoryID=0,attributes={}){
		if(categoryID>0){
			this.#setItem(categoryID,streamtype+"category");
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
		}else{
			throw new Error("Category ID cant be empty");
		}
	}

	#deleteCategory(streamtype="",categoryID=0){
		if(categoryID){
			this.#setItem(categoryID,streamtype+"category");
			this._verb=defaults.VERB_DELETE;
			this.#method="remove";
		}else{
			throw new Error("Category ID cant be empty");
		}
	}

	#setCategoryCover(streamtype="",categoryID=0,url="", description=""){
		if(categoryID){
			if(url){
				this.#setItem(categoryID,streamtype+"category");
				this._verb=defaults.VERB_POST;
				this.#method="cover";
				if(description){
					this.getParameters().set("description",description);
				}
			}else{
				throw new Error("URL cant be empty");
			}
		}else{
			throw new Error("Category ID cant be empty");
		}
	}

	addVideoCategory(attributes={}){
		this.#addCategory(streamtypes.VIDEO,attributes);
	}

	addAudioCategory(attributes={}){
		this.#addCategory(streamtypes.AUDIO,attributes);
	}

	addImageCategory(attributes={}){
		this.#addCategory(streamtypes.IMAGE,attributes);
	}

	addFileCategory(attributes={}){
		this.#addCategory(streamtypes.FILE,attributes);
	}

	addArticleCategory(attributes={}){
		this.#addCategory(streamtypes.ARTICLE,attributes);
	}

	addEventCategory(attributes={}){
		this.#addCategory(streamtypes.EVENT,attributes);
	}

	addPlaceCategory(attributes={}){
		this.#addCategory(streamtypes.PLACE,attributes);
	}

	addProductCategory(attributes={}){
		this.#addCategory(streamtypes.PRODUCT,attributes);
	}

	updateVideoCategory(categoryID=0,attributes=[]){
		this.#updateCategory(streamtypes.VIDEOcategoryID,attributes);
	}

	updateAudioCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.AUDIO,categoryID,attributes);
	}

	updateImageCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.IMAGE,categoryID,attributes);
	}

	updateFileCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.FILE,categoryID,attributes);
	}

	updateArticleCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.ARTICLE,categoryID,attributes);
	}

	updateEventCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.EVENT,categoryID,attributes);
	}

	updatePlaceCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.PLACE,categoryID,attributes);
	}

	updateProductCategory(categoryID=0,attributes={}){
		this.#updateCategory(streamtypes.PRODUCT,categoryID,attributes);
	}

	deleteVideoCategory(categoryID=0){
		this.#deleteCategory(streamtypes.VIDEO,categoryID);
	}

	deleteAudioCategory(categoryID=0){
		this.#deleteCategory(streamtypes.AUDIO,categoryID);
	}

	deleteImageCategory(categoryID=0){
		this.#deleteCategory(streamtypes.IMAGE,categoryID);
	}

	deleteFileCategory(categoryID=0){
		this.#deleteCategory(streamtypes.FILE,categoryID);
	}

	deleteArticleCategory(categoryID=0){
		this.#deleteCategory(streamtypes.ARTICLE,categoryID);
	}

	deleteEventCategory(categoryID=0){
		this.#deleteCategory(streamtypes.EVENT,categoryID);
	}

	deletePlaceCategory(categoryID=0){
		this.#deleteCategory(streamtypes.PLACE,categoryID);
	}

	deleteProductCategory(categoryID=0){
		this.#deleteCategory(streamtypes.PRODUCT,categoryID);
	}

	setVideoCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.VIDEO,categoryID,url,description);
	}

	setAudioCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.AUDIO,categoryID,url,description);
	}

	setImageCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.IMAGE,categoryID,url,description);
	}

	setArticleCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.ARTICLE,categoryID,url,description);
	}

	setEventCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.EVENT,categoryID,url,description);
	}

	setFileCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.FILE,categoryID,url,description);
	}

	setPlaceCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.PLACE,categoryID,url,description);
	}

	setProductCategoryCover(categoryID=0,url="",description=""){
		this.#setCategoryCover(streamtypes.PRODUCT,categoryID,url,description);
	}

}

module.exports={DomainManagementCall};