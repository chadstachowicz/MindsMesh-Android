var sha = require('modules/sha-aws').load();     //var sha = ; 	// file comes from this URL's project: http://aws.amazon.com/code/Amazon-S3/3236824658053653
var utf = require('modules/UTF8').load(); 		// code for this file from this URL: http://www.webtoolkit.info/javascript-utf8.html
require('modules/date').load();		// file comes from this URL: http://www.mattkruse.com/javascript/date/source.html

function errorHTTPClient(request, mode, url, data, errObj, errMsg)
{   
	if (request.readyState == 4 && request.retries < 3)
    {   request.open(mode,url);
        request.setRequestHeader("Content-Type","application/json");
        request.send(data);
        request.retries++;
    }
    else
    {   
    	var desc = errObj.error.substring(errObj.error.indexOf("Description=")+12,errObj.error.lastIndexOf("}"));
    }
};
function createHttpClient(mode,url,data,header)
{
	var xhr = Titanium.Network.createHTTPClient({timeout:3000});
	xhr.retries = 0;
	xhr.open(mode,url);
	if(header == 'FILE'){
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
	} else if (header != 'NONE'){
		xhr.setRequestHeader("Content-Type", "application/json");
	if(Titanium.Platform.osname == 'android'){
	var androidUserAgent = 'Mozilla/5.0 (Linux; U; ' + Ti.Platform.name + ' ' + Ti.Platform.version + '; ' + Ti.Locale.currentLocale + '; ' + Ti.Platform.model + ' AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
	xhr.setRequestHeader('User-Agent', androidUserAgent);}
	}
	xhr.onerror = function requestFailed(e) 
	{
		errorHTTPClient(xhr, mode, url, data, e, L("Comms Error Message"));
	};
	return xhr;
}
function createHttpClientNoError(mode,url,data,header)
{
	var xhr = Titanium.Network.createHTTPClient({timeout:3000});
	xhr.retries = 0;
	xhr.open(mode,url);
	if(header == 'FILE'){
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
	} else if (header != 'NONE'){
		xhr.setRequestHeader("Content-Type", "application/json");
	if(Titanium.Platform.osname == 'android'){
	var androidUserAgent = 'Mozilla/5.0 (Linux; U; ' + Ti.Platform.name + ' ' + Ti.Platform.version + '; ' + Ti.Locale.currentLocale + '; ' + Ti.Platform.model + ' AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
	xhr.setRequestHeader('User-Agent', androidUserAgent);}
	}
	xhr.onerror = function requestFailed(e) 
	{
		
	};
	return xhr;
}
function getNotificationsGrouped(accessToken)
{
	url = 'https://www.mindsmesh.com/api/v1/notifications/grouped/with_parents?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postRegisterDevice(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/home/register_device?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicCreate(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postEntityJoin(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/home/entities?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postPostCreate(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/posts?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data,'FILE');
	return xhr;
}
function postEncodeVideo(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/posts/encode_video?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}

function postReplyCreate(accessToken,postId,data)
{
	url = 'https://www.mindsmesh.com/api/v1/posts/' + postId + '/replies?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postTopicJoin(accessToken,topicId)
{
	url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/join.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postTopicSearch(accessToken,data)
{
	url = 'https://www.mindsmesh.com/api/v1/home/search_topics?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postLogin(FBaccessToken,data)
{
	if (FBaccessToken == "")
	{
		url = 'https://www.mindsmesh.com/api/v1/session/login'; 
	} else {
	
	url = 'https://www.mindsmesh.com/api/v1/session/login?fb_access_token=' + FBaccessToken; 
	}
	xhr = createHttpClient('POST',url,data);
	return xhr;
}
function postCreateUser(data)
{
	url = 'https://www.mindsmesh.com/api/v1/users/create'; 
	xhr = createHttpClientNoError('POST',url,data);
	return xhr;
}
function postTopicLeave(accessToken,topicId)
{
	url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/leave.json?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function postNotificationMarkAsRead(accessToken,notificationId)
{
	url = 'https://www.mindsmesh.com/api/v1/notifications/' + notificationId + '/mark_as_read?access_token=' + accessToken; 
	xhr = createHttpClient('POST',url);
	return xhr;
}
function getPostsWithFamily(accessToken,before)
{
	if(before)
	{
		url = 'https://www.mindsmesh.com/api/v1/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://www.mindsmesh.com/api/v1/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getPostWithFamily(accessToken,postId)
{
	url = 'https://www.mindsmesh.com/api/v1/posts/' + postId + '/with_family?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getNotification(accessToken,notificationId)
{
	url = 'https://www.mindsmesh.com/api/v1/notifications/' + notificationId + '?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getUserWithChildren(accessToken,userId)
{
	url = 'https://www.mindsmesh.com/api/v1/users/' + userId + '/with_children.json?access_token=' + accessToken;
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getTopicPostsWithFamily(accessToken,topicId,before)
{
	if(before)
	{
		url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://www.mindsmesh.com/api/v1/topics/' + topicId + '/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getGroupPostsWithFamily(accessToken,groupId,before)
{
	if(before)
	{
		url = 'https://www.mindsmesh.com/api/v1/groups/' + groupId + '/posts/with_family?access_token=' + accessToken + '&before=' + before;
	} else {
		url = 'https://www.mindsmesh.com/api/v1/groups/' + groupId + '/posts/with_family?access_token=' + accessToken;
	}
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postLoginToMoodle(url,data)
{
	xhr = createHttpClient('POST',url,data,'NONE');
	return xhr;
}
function getLoginToMoodle2(baseurl,username,password)
{
	url = baseurl + '/login/token.php?username=' + username + '&password=' + password + '&service=moodle_mobile_app';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getMoodle2SiteRetrieve(baseurl,wstoken)
{
	url = baseurl + '/webservice/rest/server.php?wstoken=' + wstoken + '&wsfunction=moodle_webservice_get_siteinfo&moodlewsrestformat=json';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getMoodle2CourseContents(baseurl,wstoken,courseid)
{
	url = baseurl + '/webservice/rest/server.php?wstoken=' + wstoken + '&wsfunction=core_course_get_contents&courseid=' + courseid + '&moodlewsrestformat=json';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function getMoodle2EnrolledCourses(baseurl,wstoken,userid)
{
	url = baseurl + '/webservice/rest/server.php?wstoken=' + wstoken + '&wsfunction=moodle_enrol_get_users_courses&userid=' + userid + '&moodlewsrestformat=json';
	xhr = createHttpClient('GET',url);
	return xhr;
}
function postMethodToMoodleRooms(url,data)
{
	xhr = createHttpClient('POST',url,"",'NONE');
	return xhr;
	
}
function getDataFromMoodle(url)
{
	xhr = createHttpClient('GET',url,"",'NONE');
	return xhr;
}

