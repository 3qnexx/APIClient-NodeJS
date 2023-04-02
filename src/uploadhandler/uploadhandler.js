"use strict";

const {DomainCall} = require("../apicalls/domaincall");
const {MediaManagementCall} = require("../apicalls/mediamanagementcall");
const streamtypes=require("../enums/streamtypes");
const covercontexts=require("../enums/covercontexts");
const texttrackroles=require("../enums/texttrackroles");

const fs = require("fs");
const path = require('path');
const {BlobServiceClient} = require('@azure/storage-blob');

class UploadHandler{

    #apiclient;

    constructor(apiclient){
        this.setAPIClient(apiclient);
    }

    setAPIClient(apiclient){
        if(apiclient){
            this.#apiclient=apiclient;
        }
    }

    async #getConfig(localPath){
        let config=null;
        let apicall=new DomainCall();
        apicall.uploadConfiguration(localPath);
        let result=await this.#apiclient.call(apicall);
        if(result.isSuccess()){
            config=result.getResult();
        }
        return(config);
    }

    async #doUpload(localPath,config){
        let isSuccess=false;
        let url=new URL(config.endpoint);
        let parts=url.pathname.split("/");

        let blobServiceClient=BlobServiceClient.fromConnectionString("BlobEndpoint=https://"+url.hostname+";SharedAccessSignature="+config.token);
        let containerClient=blobServiceClient.getContainerClient(parts[1]);
        let blockBlobClient=containerClient.getBlockBlobClient(parts[2]+"/"+config.file);
        let uploadBlobResponse=await blockBlobClient.uploadFile(localPath);
        if(uploadBlobResponse){
            isSuccess=true;
        }
        return(isSuccess);
    }

    async uploadMedia(localPath,streamtype,useQueue=true,autoPublish=null,refnr="",queueStart=0,asVariantFor="",asVariantOf=0){
        let media=null;
        if(this.#apiclient){
            if(!useQueue){
                this.#apiclient.setTimeout(300);
            }
            if((localPath)&&(fs.existsSync(localPath))){
                let config=await this.#getConfig(localPath);
                if(config){
                    let azureupload=await this.#doUpload(localPath,config);
                    if(azureupload){
                        let uploadcall=new MediaManagementCall();
                        uploadcall.setStreamtype(streamtype);
                        uploadcall.createFromURL(config.endpoint+"/"+config.file,useQueue,autoPublish,refnr,queueStart,asVariantFor,asVariantOf);
                        uploadcall.getParameters().set("filename",path.basename(localPath));
                        let uploadresult=await this.#apiclient.call(uploadcall);
                        if(uploadresult.isSuccess()){
                            media=uploadresult;
                        }else{
                            throw new Error("internal Error.");
                        }
                    }else{
                        throw new Error("internal Error.");
                    }
                }else{
                    throw new Error("internal Error.");
                }   
            }else{
                throw new Error("given Path must exist.");
            }
        }else{
            throw new Error("APIClient must be configured and ready.");
        }
        return(media);
    }

    async replaceMedia(localPath,streamtype=streamtypes.VIDEO,mediaid=0){
		let isSuccess=false;
        if(this.#apiclient){
			if((localPath)&&(fs.existsSync(localPath))){
				if(mediaid>0){
					let config=await this.#getConfig(localPath);
					if(config){
                        let azureupload=await this.#doUpload(localPath,config);
                        if(azureupload){
                            let uploadcall=new MediaManagementCall();
                            uploadcall.setItem(mediaid,streamtype);
                            uploadcall.updateItemFile(config.endpoint+"/"+config.file);
                            let uploadresult=await this.#apiclient.call(uploadcall);
                            if(uploadresult.isSuccess()){
                                isSuccess=true;
                            }else{
                                throw new Error("internal Error.");
                            }
                        }else{
                            throw new Error("internal error.");
                        }
					}else{
						throw new Error("internal error.");
					}
				}else{
					throw new Error("Media ID cant be empty.");
				}
			}else{
				throw new Error("given Path must exist.");
			}
		}else{
			throw new Error("APIClient must be configured and ready.");
		}
		return(isSuccess);
	}

    async setMediaCover(localPath,streamtype=streamtypes.VIDEO,mediaid=0,coverContext=covercontexts.COVER,coverDescription="",coverCopyright="",assetLanguage=""){
		let isSuccess=false;
        if(this.#apiclient){
			if((localPath)&&(fs.existsSync(localPath))){
				if(mediaid>0){
					let config=await this.#getConfig(localPath);
					if(config){
						let azureupload=await this.#doUpload(localPath,config);
						if(azureupload){
							let url=config.endpoint+"/"+config.file;
                            let uploadcall=new MediaManagementCall();
                            uploadcall.setItem(mediaid,streamtype);

							switch(coverContext){
								case covercontexts.COVER:
									uploadcall.setItemCover(url,coverDescription,coverCopyright,assetLanguage);
								break;
								case covercontexts.ALTERNATIVE:
									uploadcall.setItemCoverAlternative(url,coverDescription,coverCopyright,assetLanguage);
								break;
								case covercontexts.ABTEST:
									uploadcall.setItemCoverABTest(url,coverDescription,coverCopyright,assetLanguage);
								break;
								case covercontexts.ACTIONSHOT:
									uploadcall.setItemCoverActionShot(url,coverDescription,coverCopyright,assetLanguage);
								break;
								case covercontexts.BANNER:
									uploadcall.setItemCoverBanner(url,coverDescription,coverCopyright,assetLanguage);
								break;
								case covercontexts.QUAD:
									uploadcall.setItemCoverQuad(url,coverDescription,coverCopyright,assetLanguage);
								break;
							}
							let uploadresult=await this.#apiclient.call(uploadcall);
                            if(uploadresult.isSuccess()){
                                isSuccess=true;
                            }else{
                                throw new Error("internal Error.");
                            }
						}else{
							throw new Error("internal error.");
						}
					}else{
						throw new Error("internal error.");
					}
				}else{
					throw new Error("Media ID cant be empty.");
				}
			}else{
				throw new Error("given Path must exist.");
			}
		}else{
			throw new Error("APIClient must be configured and ready.");
		}
		return(isSuccess);
	}

    async addMediaTextTrack(localPath,streamtype=streamtypes.VIDEO,mediaid=0,language='',role=texttrackroles.SUBTITLES){
		let isSuccess=true;
        if(this.#apiclient){
			if((localPath)&&(fs.existsSync(localPath))){
				if(mediaid>0){
                    let config=await this.#getConfig(localPath);
					if(config){
                        let azureupload=await this.#doUpload(localPath,config);
						if(azureupload){
                            let uploadcall=new MediaManagementCall();
                            uploadcall.setItem(mediaid,streamtype);
                            uploadcall.addTextTrackFromURL(config.endpoint+"/"+config.file,language,"",role);
                            let uploadresult=await this.#apiclient.call(uploadcall);
                            if(uploadresult.isSuccess()){
                                isSuccess=true;
                            }else{
                                throw new Error("internal Error.");
                            }
                        }else{
                            throw new Error("internal error.");
                        }
					}else{
						throw new Error("internal error.");
					}
				}else{
					throw new Error("Media ID cant be empty.");
				}
			}else{
				throw new Error("given Path must exist.");
			}
		}else{
			throw new Error("APIClient must be configured and ready.");
		}
		return(isSuccess);
	}
    
}

module.exports={UploadHandler};