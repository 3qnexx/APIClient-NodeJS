"use strict";

const types={
	SEX:'sex',
	DRUGS:'drugs',
	VIOLENCE:'violence',
	MEDICAL:'medical',
	SPEECH:'speech'
};

function getAllTypes(){
    return(Object.values(types));
}

module.exports=types;
module.exports.getAllTypes=getAllTypes;
