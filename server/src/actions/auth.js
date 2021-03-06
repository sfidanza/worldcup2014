/******************************************************************************
 * Social Authentication/Authorization Management
 * 
 * Live demo of what Google+ is sending in the profile:
 *  https://developers.google.com/+/api/latest/people/get
 ******************************************************************************/
var fs = require("fs");
var users = require("../business/users");
var auth = require("../business/auth");

var actions = {};
module.exports = actions;

actions.callback = function(request, response, ctx) {
	fs.readFile("./server/templates/signin.html", { encoding: "utf8" }, function (err, data) {
		response.writeHead(200, { "Content-Type": "text/html" });
		response.write(data);
		response.end();
	});
};

actions.url = function(request, response, ctx) {
	response.json({ url: auth.url() });
};

actions.revoke = function(request, response, ctx) {
	var token = null; // store token somewhere (db, session) to be able to revoke
	auth.revoke(token, function(err, result) {
		if (err) {
			response.error(500, err);
		} else {
			response.json({});
		}
	});
};

actions.profile = function(request, response, ctx) {
	var query = request.query;
	auth.profile(query.code, function(err, profile) {
		if (err) {
			response.error(500, err);
		} else {
			users.register(ctx.db, profile.emails[0].value, null, 'google', {
				'name': profile.displayName
			})
			.then(function(user) {
				user.profile = profile;
				request.session.user = user;
				response.json({ user: user });
			})
			.catch(response.error.bind(response, 500))
			.done();
		}
	});
};
