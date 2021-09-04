"use strict";

const packageDetails=require('./package.json');
const fetch=require("node-fetch");
const AbortController=require("abort-controller");
const md5=require("md5");

const {UploadHandler}=require("./src/uploadhandler/uploadhandler");

const {Tools}=require("./src/internals/tools");
const {APIResult}=require("./src/result/result");
const {MetaData}=require("./src/result/metadata");
const {Paging}=require("./src/result/paging");

const {MediaCall}=require("./src/apicalls/mediacall");
const {CustomCall}=require("./src/apicalls/customcall");
const {SystemCall}=require("./src/apicalls/systemcall");
const {DomainCall}=require("./src/apicalls/domaincall");
const {SessionCall}=require("./src/apicalls/sessioncall");
const {ProcessingCall}=require("./src/apicalls/processingcall");
const {StatisticsCall}=require("./src/apicalls/statisticscall");
const {MediaManagementCall}=require("./src/apicalls/mediamanagementcall");
const {DomainManagementCall}=require("./src/apicalls/domainmanagementcall");
const {Task}=require("./src/apicalls/helpers/task");

const defaults=require("./src/enums/defaults");
const streamtypes=require("./src/enums/streamtypes");

class APIClient{

    #domain;
    #secret;
    #session;
    #customHost;
    #consumer='apiclient-node';
    #timeout=10;
    #useHTTPS=true;

    constructor(domain,secret,session){
        this.configure(domain,secret,session);
    }

    configure(domain,secret,session){
        if(domain){
            this.setDomain(domain);
        }
        if(secret){
            this.setSecret(secret);
        }
        if(session){
            this.setSession(session);
        }
    }

    setDomain(domain){
        if(domain){
            this.#domain=parseInt(domain.toString());
        }
    }

    setSecret(secret){
        if(secret){
            this.#secret=secret;
        }
    }

    setSession(session){
        if(session){
            this.#session=session;
        }
    }

    setCustomHost(host){
        this.#customHost=host;
    }

    setTimeout(timeout){
        this.#timeout=parseInt(timeout.toString());
    }

    disableHTTPS(){
        this.#useHTTPS=false;
    }

    #buildToken(path){
        let parts=path.split("/");
        return(md5(parts[1]+this.#domain+this.#secret));
    }

    #buildHost(){
        let host=defaults.API_URL;
        if(this.#customHost){
            host=this.#customHost;
        }
        return("http"+(this.#useHTTPS?"s":"")+"://"+host+"/v"+defaults.API_VERSION+"/"+this.#domain+"/");
    }

    #callAPI(verb,endpoint,parameters,modifiers){
        let url=this.#buildHost()+endpoint;
        let timeOut=this.#timeout*1000;
        if(Object.keys(parameters).length>0){
            if(Object.keys(modifiers).length>0){
                parameters=Object.assign(parameters,modifiers);
            }
        }else if(Object.keys(modifiers).length>0){
            parameters=modifiers;
        }
        if(Object.keys(parameters).length>0){
            if(verb==defaults.VERB_GET){
                let up=new URLSearchParams(parameters);
                url+="?"+up.toString();
            }
        }

        let fetchParams={
            method:verb,
            headers:{
                'X-Request-CID':this.#session,
                'X-Request-Consumer':this.#consumer,
                'X-Request-Client-Version':packageDetails.version,
                'X-Request-Token':this.#buildToken(endpoint),
                'Content-Type':'application/x-www-form-urlencoded'        
            },
            mode:'cors'
        };
        if(verb!=defaults.VERB_GET){
            if(Object.keys(parameters).length>0){
                fetchParams.body=Object.keys(parameters).map(function(key){
                    return (key+'='+encodeURIComponent(parameters[key]));
                }).join('&');
            }
        }
        console.log(verb.toUpperCase()+": "+url);
        return(new Promise(function(resolve,reject){
            var status=0;

            const controller=new AbortController();
            fetchParams.signal=controller.signal;

            const countdown = setTimeout(function(){
                controller.abort();
            },timeOut);

            fetch(url,fetchParams).then(function(res){
                status=res.status;
                return(res.json());    
            }).then(function(r){
                clearTimeout(countdown);
                resolve({status:status,data:r});    
            }).catch(function(e){
                clearTimeout(countdown);
                if((e)&&(e.name)&&(e.name=='AbortError')){
                    resolve({status:404,data:null});
                }else if((e)&&(e.message)&&(e.message.toLowerCase().includes("not found"))){
                    resolve({status:404,data:null});
                }else if((e)&&(e.message)&&(e.message.toLowerCase().includes("forbidden"))){
                    resolve({status:403,data:null});
                }else{
                    resolve({status:500,data:null});
                }  
            }); 
        }));
    }

    async call(apicall,fetchAllPossibleResults){
        if(fetchAllPossibleResults){
            if(Tools.isMediaCall(apicall.getPath())){
                apicall.getParameters().setLimit(defaults.MAX_RESULT_LIMIT);
            }else{
                fetchAllPossibleResults=false;
            }
        }
        if(Tools.callShouldIncreateTimeout(apicall.getPath())){
            this.setTimeout(Math.max(this.#timeout,30));
        }
        let response=await this.#callAPI(apicall.getVerb(),apicall.getPath(),apicall.getParameters().get(),apicall.getModifiers().get());
        let result=new APIResult(response);
        if(result.isSuccess()){
            if((fetchAllPossibleResults)&&(result.supportsPaging())&&(result.getPaging().hasMoreResults())){
                let callAgain=true;
                let start=defaults.MAX_RESULT_LIMIT;
                while(callAgain){
                    apicall.getParameters().setStart(start);
                    let aresponse=await this.#callAPI(apicall.getVerb(),apicall.getPath(),apicall.getParameters().get(),apicall.getModifiers().get());
                    let aresult=new APIResult(aresponse);
                    if(aresult.isSuccess()){
                        result.addResults(aresult.getResult(),aresult.getMetaData().getProcessingTime());
                        result.update
                        if((aresult.supportsPaging())&&(aresult.getPaging().hasMoreResults())){
                            start+=defaults.MAX_RESULT_LIMIT;
                        }else{
                            callAgain=false;
                        }
                    }
                }        
            }
        }
        return(result);   
    }
}

module.exports={APIClient, APIResult, MetaData, Paging, UploadHandler, MediaCall, CustomCall, SystemCall, DomainCall, SessionCall, ProcessingCall,StatisticsCall, MediaManagementCall, DomainManagementCall, Task, streamtypes};