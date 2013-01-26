function errorHTTPClient(request, mode, url, data, errObj, errMsg)
{   
	if (request.readyState == 4 && request.retries < 3)
    {   request.open(mode,url);
        request.setRequestHeader("Content-Type","application/json");
        request.send(data);
        request.retries++;
    }
    else
    {   var desc = errObj.error.substring(errObj.error.indexOf("Description=")+12,errObj.error.lastIndexOf("}"));
        errorAlert(L("Comms Error Title"),errMsg+desc);
        request.abort();
    }
};
function createHttpClient(mode,url,data,header)
{
	var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false, timeout:6000});
	xhr.retries = 0;
	xhr.open(mode,url);
	if (header != 'NONE'){
	xhr.setRequestHeader("Content-Type", "application/json");
	if(Titanium.Platform.osname == 'android'){
	var androidUserAgent = 'Mozilla/5.0 (Linux; U; ' + Ti.Platform.name + ' ' + Ti.Platform.version + '; ' + Ti.Locale.currentLocale + '; ' + Ti.Platform.model + ' AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
	xhr.setRequestHeader('User-Agent', androidUserAgent);}
	}
	xhr.onerror = function requestFailed(e) 
	{
		alert(e);
		errorHTTPClient(xhr, mode, url, data, e, L("Comms Error Message"));
	};
	return xhr;
}
function getNotificationsGrouped(accessToken)
{
	url = 'https://mindsmesh.com/api/v1/notifications/grouped/with_parents.json?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postRegisterDevice(accessToken,data)
{
	url = 'https://mindsmesh.com/api/v1/home/register_device?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicCreate(accessToken,data)
{
	url = 'https://mindsmesh.com/api/v1/topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postEntityJoin(accessToken,data)
{
	url = 'https://mindsmesh.com/api/v1/home/entities?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postPostCreate(accessToken,data)
{
	url = 'https://mindsmesh.com/api/v1/posts?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postReplyCreate(accessToken,postId,data)
{
	url = 'https://mindsmesh.com/api/v1/posts/' + postId + '/replies?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicJoin(accessToken,topicId)
{
	url = 'https://mindsmesh.com/api/v1/topics/' + topicId + '/join.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postTopicSearch(accessToken,data)
{
	url = 'https://mindsmesh.com/api/v1/home/search_topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postLogin(FBaccessToken)
{
	url = 'https://mindsmesh.com/api/v1/session/login?fb_access_token=' + FBaccessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postTopicLeave(accessToken,topicId)
{
	url = 'https://mindsmesh.com/api/v1/topics/' + topicId + '/leave.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postNotificationMarkAsRead(accessToken,notificationId)
{
	url = 'https://mindsmesh.com/api/v1/notifications/' + notificationId + '/mark_as_read?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function getPostsWithFamily(accessToken,before)
{
	if(before)
	{
		url = 'https://mindsmesh.com/api/v1/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://mindsmesh.com/api/v1/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getPostWithChildren(accessToken,postId)
{
	url = 'https://mindsmesh.com/api/v1/posts/' + postId + '/with_children?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getNotification(accessToken,notificationId)
{
	url = 'https://mindsmesh.com/api/v1/notifications/' + notificationId + '?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getUserWithChildren(accessToken,userId)
{
	url = 'https://mindsmesh.com/api/v1/users/' + userId + '/with_children.json?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getTopicPostsWithFamily(accessToken,topicId,before)
{
	if(before)
	{
		url = 'https://mindsmesh.com/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://mindsmesh.com/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postLoginToMoodle(url,data)
{
	xhr = createHttpClient('POST',url,data,'NONE');
	return xhr;
}
function getDataFromMoodle(url)
{
	xhr = createHttpClient('GET',url,"",'NONE');
	return xhr;
}

 
