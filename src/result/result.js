"use strict";

const {MetaData}=require("./metadata");
const {Paging}=require("./paging");
const {ResultObject}=require("./resultobject");
const {ResultIterator}=require("./resultiterator");

class APIResult{
    #response;
    #code;
    #metadata=null;
    #paging=null;

    constructor(response){
        if(response){
            this.#code=response.status;
            if(response.data){
                this.#response=response.data;
                if(response.data.metadata){
                    this.#metadata=new MetaData(response.data.metadata);
                }
                if(this.isSuccess()){
                    let pagingKey=(this.#metadata.getAPIVersion()=='4.0'?'pagination':'paging');
                    if(response.data.hasOwnProperty(pagingKey)){
                        this.#paging=new Paging(response.data[pagingKey],response.data.result.length,this.#metadata.getAPIVersion());
                    }
                }
            }
        }
    }

    getStatusCode(){
        return(this.#code);
    }

    getRawResponse(){
        return(this.#response);
    }

    getResult(){
        return(this.getRawResponse()['result']);
    }

    getResultObject(){
        let obj=null;
        if(this.supportsResultObject()){
            obj=new ResultObject(this.getResult());
        }else{
            throw new Error("result cannot be converted to object.");
        }
        return(obj);
    }

    getResultIterator(asMediaObjects=false){
        let obj=null;
        if(this.supportsIterator()){
            obj=new ResultIterator(this.getResult(),asMediaObjects);
        }else{
            throw new Error("result is not iterable.");
        }
        return(obj);
    }

    isSuccess(){
		return((this.#code)&&(this.#code>=200)&&(this.#code<400));
	}

	isError(){
		return((!this.#code)||(!this.#code<200)||(!this.#code>=400));
	}

    supportsResultObject(){
        let result=false;
        if(this.isSuccess()){
            let res=this.getResult();
            if((res)&&(!Array.isArray(res))&&((res.hasOwnProperty('general'))||(res.hasOwnProperty('itemupdate')))){
                result=true;
            }
        }
        return(result);
    }

    supportsIterator(){
        let result=false;
        if(this.isSuccess()){
            let res=this.getResult();
            if((res)&&(Array.isArray(res))&&(res[0])&&(res[0].hasOwnProperty('general'))){
                result=true;
            }
        }
        return(result);
    }

    addResults(results,addedTime){
        this.#response['result']=this.#response['result'].concat(results);
        if((this.#metadata)&&(addedTime)){
            this.#metadata.updateProcessingTime(this.#metadata.getProcessingTime()+addedTime);
        }
		if(this.#paging){
			this.#paging.updateSize(this.#response['result'].length);
		}
	}

    getErrorReason(){
        let reason="";
        if(this.#metadata){
            reason=this.#metadata.getErrorHint();
        }
        return(reason);
    }

    getMetaData(){
        return(this.#metadata);
    }

    supportsPaging(){
        return(this.#paging!==null);
    }

    getPaging(){
        return(this.#paging);
    }

}

module.exports={APIResult};