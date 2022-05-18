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
s7sdk.Util.require("s7sdk.common.Data");if(!s7sdk.Callback){s7sdk.Callback=function Callback(d,c,b,a){this.onSuccess=d;this.onError=c;this.context=b;this.status=a};s7sdk.Callback.prototype.cleanUp=function cleanUp(){this.onSuccess=s7sdk.Callback.noop;this.onError=s7sdk.Callback.noop;this.context=s7sdk.Callback.noop};s7sdk.Callback.pending={};s7sdk.Callback.noop=function noop(){}}if(!s7sdk.IS){s7sdk.IS=function(){this.callback=null;this.lastReqId=null};s7sdk.IS.STATUS_SUCCESS="success";s7sdk.IS.STATUS_ERROR="error";s7sdk.IS.STATUS_PENDING="pending";s7sdk.IS.STATUS_CANCELLED="cancelled";s7sdk.IS.prototype.getHttpReq=function(e,g,c,a){var f=this.lastReqId=this.getHashCode(e);var b=e+"&id="+f;s7sdk.Callback.pending[f]=s7sdk.Callback.pending[f]||[];this.callback=new s7sdk.Callback(g,c,a,s7sdk.IS.STATUS_PENDING);s7sdk.Callback.pending[f].push(this.callback);var d=s7sdk.Util.byId("s7req_"+f);if(d){}d=document.createElement("script");d.setAttribute("id","s7req_"+f);d.setAttribute("type","text/javascript");d.setAttribute("language","javascript");d.setAttribute("src",b);if(s7sdk.browser.name==="ie"){s7sdk.Util.async(function(){s7sdk.Util.byFirstTag("head").appendChild(d)},this)}else{s7sdk.Util.byFirstTag("head").appendChild(d)}};s7sdk.IS.prototype.cancelHttpReq=function(){if((this.callback!=null)&&(this.callback.status==s7sdk.IS.STATUS_PENDING)){this.callback.status=s7sdk.IS.STATUS_CANCELLED;this.callback.cleanUp()}};s7sdk.IS.prototype.getStatus=function(){return this.callback.status};s7sdk.IS.prototype.getHashCode=function(f){if(!f||f==""){return 1}var b=0,e=0;for(var a=f.length-1;a>=0;a--){var j=parseInt(f.charCodeAt(a));b=((b<<6)&268435455)+j+(j<<14);if((e=b&266338304)!=0){b=(b^(e>>21))}}return b}};