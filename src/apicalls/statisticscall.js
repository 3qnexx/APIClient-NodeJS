"use strict";

const {APICall}=require("../internals/apicall");
const {StatisticParameters}=require("./parameters/statisticparameters");
const streamtypes=require("../enums/streamtypes");
const registrationproviders=require("../enums/registrationproviders");
const revenuetypes=require("../enums/revenuetypes");
const subscriptionterminationreasons=require("../enums/subscriptionterminationreasons");
const kpis=require("../enums/kpis");
const date = require('date-and-time');

class StatisticsCall extends APICall{

	constructor(streamtype=streamtypes.VIDEO){
        super();
		this._path="statistics/";
		this._parameters=new StatisticParameters();
		this.setStreamtype(streamtype);
		let now = new Date();
		this.setDates(date.format(date.addDays(now,-30),"YYYY-MM-DD"),date.format(date.addDays(now,-1),"YYYY-MM-DD"));
    }

	#dateIsValid(datestring){
		return (date.isValid(datestring,"YYYY-MM-DD"));
	}

	#timeframeIsValid(timeframe){
		return([5, 10, 15, 30, 60, 120, 180, 240].includes(timeframe));
	}

	setStreamtype(streamtype){
		if(streamtypes.getAllTypes().includes(streamtype)){
			this.getParameters().setStreamtype(streamtype);
		}else{
			throw new Error("Streamtype not supported");
		}
	}

	setDates(from,to){
		if(this.#dateIsValid(from)){
			this.getParameters().setFrom(from);
		}else{
			throw new Error("from must be in YYYY-MM-DD format");
		}
		if(this.#dateIsValid(to)){
			this.getParameters().setTo(to);
		}else{
			throw new Error("to must be in YYYY-MM-DD format");
		}
	}

	displayByDay(){
		this._path+="displaysbyday";
	}

	playerStartsByDay(){
		this._path+="playerstartsbyday";
	}

	viewsByDay(){
		this._path+="viewsbyday";
	}

	viewsExternalByDay(){
		this._path+="viewsexternalbyday";
	}

	viewTimeByDay(){
		this._path+="viewtimebyday";
	}

	viewTimeAverageByDay(){
		this._path+="viewtimeaveragebyday";
	}

	viewProgressByDay(){
		this._path+="viewprogressbyday";
	}

	downloadsByDay(){
		this._path+="downloadsbyday";
	}

	clicksByDay(){
		this._path+="viewsbyday";
	}

	adRequestsByDay(){
		this._path+="adrequestsbyday";
	}

	adImpressionsByDay(){
		this._path+="adimpressionsbyday";
	}

	adClicksByDay(){
		this._path+="adclicksbyday";
	}

	loginsByDay(provider=""){
		this._path+="loginsbyday";
		if(provider){
			if(registrationproviders.getAllTypes().includes(provider)){
				this.getParameters().set("provider",provider);
			}else{
				throw new Error("Provider not supported");
			}
		}
	}

	registrationsByDay(provider=""){
		this._path+="registrationsbyday";
		if(provider){
			if(registrationproviders.getAllTypes().includes(provider)){
				this.getParameters().set("provider",provider);
			}else{
				throw new Error("Provider not supported");
			}
		}
	}

	revenueByDay(type=""){
		this._path+="revenuebyday";
		if(!empty($type)){
			if(revenuetypes.getAllTypes().includes(type)){
				this.getParameters().set("type",type);
			}else{
				throw new Error("Revenue Type not supported");
			}
		}
	}

	subscriptionsByDay(onlyPremium=false,onlyStandard=false,excludeTerminated=false){
		this._path+="subscriptionsbyday";
		if(onlyPremium){
			this.getParameters().set("onlyPremium",1);
		}
		if(onlyStandard){
			this.getParameters().set("onlyStandard",1);
		}
		if(excludeTerminated){
			this.getParameters().set("excludeTerminated",1);
		}
	}

	subscriptionTerminationsByDay(reason=""){
		this._path+="revenuebyday";
		if(reason){
			if(subscriptionterminationreasons.getAllTypes().includes(reason)){
				this.getParameters().set("reason",reason);
			}else{
				throw new Error("Subscription Termination Reason not supported");
			}
		}
	}

	realtime(timeframe=30){
		this._path+="realtime";
		if(this.#timeframeIsValid(timeframe)){
			this.getParameters().set("timeFrame",timeframe);
		}else{
			throw new Error("TimeFrame not supported");
		}
	}

	realtimeExternal(timeframe=30){
		this._path+="realtimeexternal";
		if(this.#timeframeIsValid(timeframe)){
			this.getParameters().set("timeFrame",timeframe);
		}else{
			throw new Error("TimeFrame not supported");
		}
	}

	realtimeCharts(timeframe=30){
		this._path+="realtimecharts";
		if(this.#timeframeIsValid(timeframe)){
			this.getParameters().set("timeFrame",timeframe);
		}else{
			throw new Error("TimeFrame not supported");
		}
	}

	realtimeChartsExternal(timeframe=30){
		this._path+="realtimechartsexternal";
		if(this.#timeframeIsValid(timeframe)){
			this.getParameters().set("timeFrame",timeframe);
		}else{
			throw new Error("TimeFrame not supported");
		}
	}

	itemlist(kpi){
		if(kpis.getAllTypes().includes(kpi)){
			this._path+="itemlist";
			this.getParameters().set("kpi",kpi);
		}else{
			throw new Error("KPI not supported");
		}
	}

	chartsByDisplays(){
		this._path+="chartsbydisplays";
	}

	chartsByDPlayerStarts(){
		this._path+="chartsbyplayerstarts";
	}

	chartsByViews(){
		this._path+="chartsbyviews";
	}

	chartsByViewsExternal(){
		this._path+="chartsbyviewsexternal";
	}

	chartsByViewtime(){
		this._path+="chartsbyviewtime";
	}

	chartsByViewtimeAverage(){
		this._path+="chartsbyviewtimeaverage";
	}

	chartsByCompletion(){
		this._path+="chartsbycompletion";
	}

	chartsByDownloads(){
		this._path+="chartsbydownloads";
	}

	chartsByClicks(){
		this._path+="chartsbyclicks";
	}

	distributionByGateway(){
		this._path+="distributionbygateway";
	}

	distributionByDevice(){
		this._path+="distributionbydevice";
	}

	distributionByOS(){
		this._path+="distributionbyos";
	}

	distributionByBrowser(){
		this._path+="distributionbybrowser";
	}

	distributionByPodcastApp(){
		this._path+="distributionbypodcastapp";
	}

	distributionByChannel(){
		this._path+="distributionbychannel";
	}

	distributionByFormat(){
		this._path+="distributionbyformat";
	}

	distributionByLicensor(){
		this._path+="distributionbylicensor";
	}
}

module.exports={StatisticsCall};