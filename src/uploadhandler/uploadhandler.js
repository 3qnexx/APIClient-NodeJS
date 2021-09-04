"use strict";

const {DomainCall} = require("../apicalls/domaincall");
const {MediaManagementCall} = require("../apicalls/mediamanagementcall");

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
        let mediaid=0;
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
                            console.log(uploadresult.getResult());
                            console.log(uploadresult.getResultObject());
                            mediaid=uploadresult.getResultObject().getGeneratedID();
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
        return(mediaid);
    }
    
}

module.exports={UploadHandler};