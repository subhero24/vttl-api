import soap from '../utils/soap.js';
import { XmlString, XmlBoolean, XmlNodes, XmlInteger } from '../utils/xml.js';

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
	let xml = await soap({ GetMatchesRequest: options });
	return XmlNodes(xml, 'TeamMatchesEntries', parseMatch);
}

function parseMatch(xml) {
	let result = {
		id: XmlString(xml, 'MatchUniqueId'),
		name: XmlString(xml, 'MatchId'),
		time: XmlString(xml, 'Time'),
		date: XmlString(xml, 'Date'),
		system: XmlString(xml, 'MatchSystem'),
		locked: XmlBoolean(xml, 'IsLocked'),
		validated: XmlBoolean(xml, 'IsValidated'),
		referee: XmlString(xml, 'Referee'),
		commissioner: XmlString(xml, 'HallCommissioner'),
		venue: {
			id: XmlString(xml, 'Venue'),
			club: XmlString(xml, 'VenueClub'),
			name: XmlString(xml, 'VenueEntry Name'),
			town: XmlString(xml, 'VenueEntry Town'),
			street: XmlString(xml, 'VenueEntry Street'),
			phone: XmlString(xml, 'VenueEntry Phone'),
			comment: XmlString(xml, 'VenueEntry Comment'),
		},
		division: {
			id: XmlString(xml, 'DivisionId'),
			name: XmlString(xml, 'DivisionName'),
			category: XmlString(xml, 'DivisionCategory'),
		},
		week: XmlString(xml, 'WeekName'),
		weeks: {
			previous: XmlString(xml, 'PreviousWeekName'),
			next: XmlString(xml, 'NextWeekName'),
		},
		home: {
			club: XmlString(xml, 'HomeClub'),
			team: XmlString(xml, 'HomeTeam'),
			captain: XmlString(xml, 'HomeCaptain'),
			players: XmlNodes(xml, 'HomePlayers Players', parsePlayer),
			withdrawn: XmlString(xml, 'IsHomeWithdrawn', parseWithdrawn),
			forfaited: XmlBoolean(xml, 'IsHomeForfeited'),
		},
		away: {
			club: XmlString(xml, 'AwayClub'),
			team: XmlString(xml, 'AwayTeam'),
			score: XmlInteger(xml, 'AwayScore'),
			captain: XmlString(xml, 'AwayCaptain'),
			players: XmlNodes(xml, 'AwayPlayers Players', parsePlayer),
			withdrawn: XmlString(xml, 'IsAwayWithdrawn', parseWithdrawn),
			forfaited: XmlBoolean(xml, 'IsAwayForfeited'),
		},
		matches: XmlNodes(xml, 'IndividualMatchResults', parseGame),
	};

	let score = XmlString(xml, 'Score');
	if (score) {
		result.home.score = XmlInteger(xml, 'HomeScore');
		result.away.score = XmlInteger(xml, 'AwayScore');
	}

	return result;
}

function parseWithdrawn(value) {
	return value === 'Y';
}

function parsePlayer(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		ranking: XmlString(xml, 'Ranking'),
		position: XmlInteger(xml, 'Position'),
		lastname: XmlString(xml, 'LastName'),
		firstname: XmlString(xml, 'FirstName'),
		victories: XmlInteger(xml, 'VictoryCount'),
	};
}

function parseGame(xml) {
	return {
		position: XmlInteger(xml, 'Position'),
		home: {
			sets: XmlInteger(xml, 'HomeSetCount'),
			player: {
				id: XmlInteger(xml, 'HomePlayerUniqueIndex'),
				index: XmlInteger(xml, 'HomePlayerMatchIndex'),
			},
		},
		away: {
			sets: XmlInteger(xml, 'AwaySetCount'),
			player: {
				id: XmlInteger(xml, 'AwayPlayerUniqueIndex'),
				index: XmlInteger(xml, 'AwayPlayerMatchIndex'),
			},
		},
		score: XmlString(xml, 'Scores', parseSetScores),
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
		return { home, away };
	});
}
