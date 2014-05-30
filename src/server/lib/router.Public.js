var fs = require('fs');

var mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"png": "image/png",
	"gif": "image/gif",
	"ico": "image/x-icon",
	"js": "text/javascript",
	"css": "text/css"
};

var Router = function() {
};

Router.prototype.serve = function(ctx, response) {
	var view = ctx.view;
	var filename = "./client/img/" + view;
	
	var fileStream = fs.createReadStream(filename);
	fileStream.on("error", function(error) {
		response.writeHead(404, { "Content-Type": "text/plain"});
		response.end("404 Not Found");
	});
	fileStream.on("open", function() {
		var mimeType = mimeTypes[view.split(".")[1]];
		response.writeHead(200, { "Content-Type": mimeType });
		fileStream.pipe(response);
	});
	
	return 200;
};

module.exports = Router;
