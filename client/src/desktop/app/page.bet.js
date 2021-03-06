/**********************************************************
 * Bet Engine
 **********************************************************/
 
page.bet = {};

page.bet.initialize = function() {
};

page.bet.destroy = function() {
};

page.bet.plug = function() {
	this.active = true;
};

page.bet.unplug = function() {
	if (this.active) {
		this.active = false;
	}
};

page.bet.betOnChampion = function(teamId) {
	if (page.data.user) { // avoid sending request if user is not logged in
		var url = "api/bet/champion?champion=" + teamId;
		frw.ssa.sendRequest({
			url: url,
			type: 'json',
			callback: this.afterBet,
			override: this
		});
	}
};

page.bet.betOnMatchWinner = function(mid, teamId) {
	if (page.data.user) { // avoid sending request if user is not logged in
		var url = "api/bet/match?mid=" + mid + "&winner=" + teamId;
		frw.ssa.sendRequest({
			url: url,
			type: 'json',
			callback: this.afterBet,
			override: this
		});
	}	
};

page.bet.afterBet = function(data) {
	if (data) {
		page.data.bets = data.bets;
		page.redrawView();
	}
};
