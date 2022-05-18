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
s7sdk.Util.require("s7sdk.set.SpinFrame");if(!s7sdk.SpinFrameLoader){s7sdk.SpinFrameLoader=function(a){this.delay=(null==a)?100:a;this.spinFrames=new Array();this.queue=new Array(s7sdk.SpinFrame.MAX_PRIORITY);for(var b=0;b<s7sdk.SpinFrame.MAX_PRIORITY;b++){this.queue[b]=[]}this.toLoad=1;this.timer=setInterval(s7sdk.Util.wrapContext(this.onProcess,this),this.delay);this.loading=0};s7sdk.SpinFrameLoader.prototype.load=function(a){if(a.view!=null){return}this.queue[a.priority-1].push(a)};s7sdk.SpinFrameLoader.prototype.reducePriority=function(){var a=this.toLoad;while(a-->0){this.queue[0]=this.queue.shift().concat(this.queue[0]);this.queue.push([])}};s7sdk.SpinFrameLoader.prototype.queueLength=function(){var b=0,a=0;for(;a<this.queue.length;a++){b+=this.queue[a].length}return b};s7sdk.SpinFrameLoader.prototype.onProcess=function(){var d,b=0,a,e;for(a=s7sdk.SpinFrame.MAX_PRIORITY-1;a>=0&&b<=this.toLoad;a--){e=this.queue[a];while(b<=this.toLoad&&e.length>0){d=e.shift();if(!d.loaded){d.loadFrame();var c=this;if(!d.view.loadResetImage){d.view.viewParent.onReadyToDislpay=function(){c.loading--}}else{d.view.onResetImageLoaded=s7sdk.Util.wrapContext(this.onResetImageLoaded,this)}this.loading++;b++}}}};s7sdk.SpinFrameLoader.prototype.onResetImageLoaded=function(){this.loading--}};