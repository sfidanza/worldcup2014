/**********************************************************
 * History Management
 **********************************************************/

frw.history = {};

frw.history.initialize = function(onRestore) {
	this.onRestore = onRestore;
	frw.addListener(window, "hashchange", this.restoreState.bind(this));
};

frw.history.getCurrentState = function() {
	var hash = window.location.hash.slice(1);
	return hash;
};

frw.history.pushState = function(hash, title) {
	document.title = title;
	this.manualHash = hash;
	window.location.hash = hash;
};

frw.history.restoreState = function() {
	var hash = window.location.hash.slice(1);
	if (hash !== this.manualHash) {
		this.manualHash = null;
		this.onRestore(hash);
	}
};
