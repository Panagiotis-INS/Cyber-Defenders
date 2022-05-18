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
function s7jsonResponse(a,c){var b=s7sdk.Callback.pending[c].shift();if(b.status==s7sdk.IS.STATUS_CANCELLED){return}b.status=s7sdk.IS.STATUS_SUCCESS;b.onSuccess(a,b.context);b.cleanUp()}function s7jsonError(a,c){var b=s7sdk.Callback.pending[c].shift();if(b.status==s7sdk.IS.STATUS_CANCELLED){return}b.status=s7sdk.IS.STATUS_ERROR;b.onError(a);b.cleanUp()};