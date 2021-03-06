/******************************************************************************
 * Bet management
 ******************************************************************************/
var bets = require("../business/bets");
	
var actions = {};
module.exports = actions;

/**
 * Update Bet
 */
actions.champion = function(request, response, ctx) {
	var user = request.session.user;
	if (user && user.id) {
		var query = request.query;
		bets.enterChampionBet(ctx.db, user.id, query.champion)
			.then(respondUserBets(ctx.db, response))
			.catch(response.error.bind(response, 500))
			.done();
	} else {
		response.error(401);
	}
};

actions.match = function(request, response, ctx) {
	var user = request.session.user;
	if (user && user.id) {
		var query = request.query;
		bets.enterMatchWinnerBet(ctx.db, user.id, +query.mid, query.winner)
			.then(respondUserBets(ctx.db, response))
			.catch(response.error.bind(response, 403))
			.done();
	} else {
		response.error(401);
	}
};

actions.leaderboard = function(request, response, ctx) {
	bets.getLeaderboard(ctx.db)
		.then(response.json.bind(response))
		.catch(response.error.bind(response, 500))
		.done();
};

actions.computeLeaderboard = function(request, response, ctx) {
	var user = request.session.user;
	if (user && user.isAdmin) {
		bets.computeLeaderboard(ctx.db)
			.then(response.json.bind(response))
			.catch(response.error.bind(response, 500))
			.done();
	} else {
		response.error(401);
	}
};

function respondUserBets(db, response) {
	return bets.getBets(db)
		.then(function(bets) {
			response.json({ bets: bets });
		});
}
