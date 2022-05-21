"use strict";

class ResultObject{

    constructor(data){
        return new Proxy(data,{
			get:function(target, key){
				if((typeof(target[key]=="object"))&&(target[key]!=null)){
					return new ResultObject(target[key]);    
				}else if(target[key]==null){
					if((target['itemupdate'])&&(target['itemupdate'][key])!=null){
						return(target['itemupdate'][key]);        
					}else{
						var newKey=key.slice(3).toLowerCase();
						if(['id','gid'].includes(newKey)){
							newKey=newKey.toUpperCase();
						}else if(['generatedid','generatedgid'].includes(newKey)){
							newKey=newKey.replace("id","ID").replace("gid","GID");
						}
						if((target['itemupdate'])&&(target['itemupdate'][newKey])!=null){
							return function(...args) {
								return(target['itemupdate'][newKey]);
							};      
						}else if((key.startsWith('get'))&&(target[newKey]!==null)){
							return function(...args) {
								if(typeof(target[newKey])=="object"){
									return new ResultObject(target[newKey]);
								}else{
									return(target[newKey]);
								}
							};
						}else{
							return(null);
						}  
					}
				}else{
					return(target[key]);
				}
			}
		});
    }
}

module.exports={ResultObject};