import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';

import {
	XmlString,
	XmlBoolean,
	XmlNodes,
	XmlInteger,
	XmlDate,
	XmlNode,
	XmlStrings,
	XmlIntegers,
} from '../utils/xml.js';

// Options can contain the following fields:
// - DivisionId
// - Club
// - Team
// - DivisionCategory
// - Season
// - WeekName
// - Level
// - ShowDivisionName (yes/no/short)
// - YearDateFrom (YYYY-MM-DD)
// - YearDateTo (YYYY-MM-DD)
// - WithDetails
// - MatchId
// - MatchUniqueId

export default async function matches(options = {}) {
	let props = prepare(options, [
		['id', 'MatchUniqueId'],
		['name', 'MatchId'],
		['week', 'WeekName'],
		['start', 'YearDateFrom'],
		['finish', 'YearDateTo'],
		['details', 'WithDetails'],
		['category', 'DivisionCategory'],
		['division', 'DivisionId'],
		['divisions', 'ShowDivisionName'],
	]);

	let xml = await soap({ GetMatchesRequest: props });
	let matches = XmlNodes(xml, 'TeamMatchesEntries', parseMatch);
	return matches;
}

function parseMatch(xml) {
	let time = XmlString(xml, 'Time');
	let date = XmlString(xml, 'Date');
	let timestamp = new Date(date + ' ' + time);

	return {
		id: XmlString(xml, 'MatchUniqueId'),
		name: XmlString(xml, 'MatchId'),
		week: XmlString(xml, 'WeekName'),
		weeks: {
			prev: XmlString(xml, 'PreviousWeekName'),
			next: XmlString(xml, 'NextWeekName'),
		},
		venue: {
			id: XmlString(xml, 'Venue'),
			club: XmlString(xml, 'VenueClub'),
			name: XmlString(xml, 'VenueEntry Name'),
			town: XmlString(xml, 'VenueEntry Town'),
			phone: XmlString(xml, 'VenueEntry Phone'),
			street: XmlString(xml, 'VenueEntry Street'),
			comment: XmlString(xml, 'VenueEntry Comment'),
		},
		category: XmlString(xml, 'DivisionCategory'),
		division: {
			id: XmlString(xml, 'DivisionId'),
			name: XmlString(xml, 'DivisionName'),
		},
		home: {
			club: XmlString(xml, 'HomeClub'),
			team: XmlString(xml, 'HomeTeam'),
			score: XmlInteger(xml, 'HomeScore'),
			captain: XmlString(xml, 'HomeCaptain'),
			singles: XmlNodes(xml, 'HomePlayers Players', parseSingle),
			doubles: XmlNodes(xml, 'HomePlayers DoubleTeams', parseDouble),
			withdrawn: XmlString(xml, 'IsHomeWithdrawn', parseWithdrawn),
			forfaited: XmlBoolean(xml, 'IsHomeForfeited'),
		},
		away: {
			club: XmlString(xml, 'AwayClub'),
			team: XmlString(xml, 'AwayTeam'),
			score: XmlInteger(xml, 'AwayScore'),
			captain: XmlString(xml, 'AwayCaptain'),
			singles: XmlNodes(xml, 'AwayPlayers Players', parseSingle),
			doubles: XmlNodes(xml, 'AwayPlayers DoubleTeams', parseDouble),
			withdrawn: XmlString(xml, 'IsAwayWithdrawn', parseWithdrawn),
			forfaited: XmlBoolean(xml, 'IsAwayForfeited'),
		},
		score: XmlString(xml, 'Score'),
		games: XmlNodes(xml, 'IndividualMatchResults', parseGame),
		start: XmlString(xml, 'StartTime'),
		finish: XmlString(xml, 'EndTime'),
		system: XmlString(xml, 'MatchSystem'),
		locked: XmlBoolean(xml, 'IsLocked'),
		referee: XmlString(xml, 'Referee'),
		commissioner: XmlString(xml, 'HallCommissioner'),
		comments: XmlNodes(xml, 'CommentEntries', parseComment),
		validated: XmlBoolean(xml, 'IsValidated'),
		timestamp,
	};
}

function parseWithdrawn(value) {
	return value === 'Y';
}

function parseSingle(xml) {
	return {
		player: {
			id: XmlString(xml, 'UniqueIndex'),
			lastname: XmlString(xml, 'LastName'),
			firstname: XmlString(xml, 'FirstName'),
		},
		ranking: XmlString(xml, 'Ranking'),
		position: XmlInteger(xml, 'Position'),
		victories: XmlInteger(xml, 'VictoryCount'),
		forfeited: XmlBoolean(xml, 'IsForfeited'),
	};
}

function parseDouble(xml) {
	return {
		team: XmlString(xml, 'Team'),
		position: XmlInteger(xml, 'Position'),
		forfeited: XmlBoolean(xml, 'IsForfeited'),
	};
}

function parseGame(xml) {
	let homePlayerIds = XmlStrings(xml, 'HomePlayerUniqueIndex');
	let homePlayerIndexes = XmlIntegers(xml, 'HomePlayerMatchIndex');
	if (homePlayerIds.length !== homePlayerIndexes.length) {
		throw new Error('Could not parse home players');
	}

	let awayPlayerIds = XmlStrings(xml, 'AwayPlayerUniqueIndex');
	let awayPlayerIndexes = XmlIntegers(xml, 'AwayPlayerMatchIndex');
	if (awayPlayerIds.length !== awayPlayerIndexes.length) {
		throw new Error('Could not parse away players');
	}

	let homePlayers = homePlayerIds.map((id, index) => ({ id, index: homePlayerIndexes[index] }));
	let awayPlayers = awayPlayerIds.map((id, index) => ({ id, index: awayPlayerIndexes[index] }));

	return {
		position: XmlInteger(xml, 'Position'),
		home: {
			sets: XmlInteger(xml, 'HomeSetCount'),
			players: homePlayers,
			forfeited: XmlBoolean(xml, 'IsHomeForfeited'),
		},
		away: {
			sets: XmlInteger(xml, 'AwaySetCount'),
			players: awayPlayers,
			forfeited: XmlBoolean(xml, 'IsAwayForfeited'),
		},
		sets: XmlString(xml, 'Scores', parseSetScores),
	};
}

function parseComment(xml) {
	return {
		code: XmlString(xml, 'Code'),
		author: XmlNode(xml, 'Author', parseAuthor),
		comment: XmlString(xml, 'Comment'),
		timestamp: XmlDate(xml, 'Timestamp'),
	};
}

function parseAuthor(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		lastname: XmlString(xml, 'LastName'),
		firstname: XmlString(xml, 'FirstName'),
	};
}

function parseSetScores(scores) {
	return scores.split(',').map(function (score) {
		let points = parseInt(score.split('|')[1], 10);

		let home, away;
		if (points < 0 || Object.is(points, -0)) {
			home = Math.abs(points);
			away = Math.max(11, home + 2);
		} else {
			away = parseInt(points, 10);
			home = Math.max(11, away + 2);
		}
		return [home, away];
	});
}
