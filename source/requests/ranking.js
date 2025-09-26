import soap from '../utils/soap.js';

import { prepare } from '../utils/options.js';
import { XmlNode, XmlNodes, XmlString, XmlInteger } from '../utils/xml.js';

// Options can contain the following fields:
// - DivisionId
// - WeekName
// - RankingSystem

export default async function getRanking(options = {}) {
	let props = prepare(options, [
		['week', 'WeekName'],
		['system', 'RankingSystem'],
		['division', 'DivisionId'],
	]);

	let xml = await soap({ GetDivisionRankingRequest: props });
	let ranking = XmlNode(xml, 'GetDivisionRankingResponse', parseRanking);

	ranking.division.id = options.division;

	return ranking;
}

function parseRanking(xml) {
	return {
		rankings: XmlNodes(xml, 'RankingEntries', parseRankingEntry),
		division: {
			name: XmlString(xml, 'DivisionName'),
		},
	};
}

function parseRankingEntry(xml) {
	return {
		points: XmlInteger(xml, 'Points'),
		position: XmlInteger(xml, 'Position'),
		team: {
			club: XmlString(xml, 'TeamClub'),
			name: XmlString(xml, 'Team'),
		},
		matches: {
			won: XmlInteger(xml, 'GamesWon'),
			lost: XmlInteger(xml, 'GamesLost'),
			draw: XmlInteger(xml, 'GamesDraw'),
			total: XmlInteger(xml, 'GamesPlayed'),
			forfeit: XmlInteger(xml, 'GamesWO'),
		},
		games: {
			won: XmlInteger(xml, 'IndividualMatchesWon'),
			lost: XmlInteger(xml, 'IndividualMatchesLost'),
		},
		sets: {
			won: XmlInteger(xml, 'IndividualSetsWon'),
			lost: XmlInteger(xml, 'IndividualSetsLost'),
		},
	};
}
