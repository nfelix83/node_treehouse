var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require('querystring');

var commonHeader = {'Content-Type': 'text/html'};

function homeRoute(req, res){
	if(req.url === '/') {
		if(req.method.toLowerCase() === 'get'){
			res.writeHead(200, commonHeader);
			renderer.view('header', {}, res);
			renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		} else {
			req.on('data',function(postBody){
				var queryObject = querystring.parse(postBody.toString());
				res.writeHead(303, {'Location': '/' + queryObject.username});
				res.end();
			});
		}
	}
}

function userRoute(req, res){
	var userName = req.url.replace("/", "");
	if(userName.length > 0){
		res.writeHead(200, commonHeader);
		renderer.view('header', {}, res);
		var studentProfile = new Profile(userName);
		studentProfile.on('end', function(profileJSON){
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			};

		renderer.view('profile', values, res);
		renderer.view('footer', {}, res);
		res.end();
		});

		studentProfile.on('error', function(error){
			renderer.view('error', {errorMessage: error.message}, res);
			renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		});
	}
};

module.exports.home = homeRoute;
module.exports.user = userRoute;