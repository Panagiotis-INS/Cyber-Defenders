/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
s7sdk.pkg("s7sdk.set");s7sdk.Util.require("s7sdk.common.Geometry");s7sdk.Util.require("s7sdk.common.IS");s7sdk.Util.require("s7sdk.common.ItemDesc");s7sdk.Util.require("s7sdk.utils.SwatchesParser");if(!s7sdk.set.MediaSet){s7sdk.set.MediaSet=function MediaSet(a,c,b){s7sdk.Logger.log(s7sdk.Logger.CONFIG,"s7sdk.set.MediaSet constructor - containerId: %0, settings: %1 , compId: %2",a,c,b);arguments.callee.superclass.apply(this,[b,a,"div","s7mediaset",c]);this.createElement();this.container=s7sdk.Util.byId(a);this.mediaSetDesc=null;this.locale=this.getParam("locale","");if(this.serverUrl.lastIndexOf("/")!=(this.serverUrl.length-1)){this.serverUrl+="/"}if(typeof(this.asset)=="string"&&this.asset.length>0){this.requestMediaSet()}};s7sdk.Class.inherits("s7sdk.set.MediaSet","s7sdk.UIComponent");s7sdk.set.MediaSet.prototype.modifiers={asset:{params:["asset"],defaults:[""],parseParams:false},serverUrl:{params:["isRootPath"],defaults:["/is/image/"]},labelKey:{params:["key"],defaults:["label"]}};s7sdk.set.MediaSet.prototype.setAsset=function(a){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.MediaSet.setAsset - asset: %0",a);a=a.toString();if(a==""||a==null){return}if(a!=null&&this.asset!=null&&this.asset!=""){this.dispatchEvent(new s7sdk.event.UserEvent(s7sdk.event.UserEvent.SWAP,[0,a]))}this.asset=a;this.requestMediaSet()};s7sdk.set.MediaSet.prototype.requestMediaSet=function(){s7sdk.Logger.log(s7sdk.Logger.INFO,"MediaSet.requestMediaSet");this.mediaSet_=this.asset;var a=this.serverUrl;if(a.lastIndexOf("/")<(a.length-1)){a+="/"}if(this.asset.match(/[=&,;:\{\}\(\)]|\?.*\?/)){a+=s7sdk.MediaSetParser.findCompanyNameInAsset(this.asset);a+="/?imageSet=";a+=encodeURIComponent(this.asset);a+="&"}else{a+=this.asset;a+=(a.indexOf("?")==-1)?"?":"&"}a+="req=set,json,UTF-8";if(s7sdk.Util.isNonEmptyString(this.labelKey)){a+="&labelkey="+this.labelKey}if(s7sdk.Util.isNonEmptyString(this.locale)){a+="&locale="+this.locale}this.isReq_=new s7sdk.IS(this.serverUrl,this.mediaSet_);this.isReq_.getHttpReq(a,this.requestComplete,this.requestError,this)};s7sdk.set.MediaSet.prototype.requestComplete=function(b,d){var a=b.set;if(a==null){return}d.mediaSetDesc_=s7sdk.MediaSetParser.parse(a);var c=new s7sdk.event.AssetEvent(s7sdk.event.AssetEvent.NOTF_SET_PARSED,d.mediaSetDesc_,0,true);d.dispatchEvent(c)};s7sdk.set.MediaSet.prototype.requestError=function(a,b){s7sdk.Logger.log(s7sdk.Logger.WARNING,"s7sdk.set.MediaSet.requestError - response: %0",a)};s7sdk.MediaSet=s7sdk.set.MediaSet};