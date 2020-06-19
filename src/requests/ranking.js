import request from '../utils/request';
import { XmlNode, XmlNodes, XmlString, XmlInteger } from '../utils/xml-types';

// Options can contain the following fields:
// - DivisionId
// - WeekName
// - RankingSystem

export default async function ranking(options) {
	let xml = await request({ GetDivisionRankingRequest: options });
	return XmlNode(xml, 'GetDivisionRankingResponse', parseRanking);
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
		team: {
			club: XmlString(xml, 'TeamClub'),
			name: XmlString(xml, 'Team'),
		},
		points: XmlInteger(xml, 'Points'),
		position: XmlInteger(xml, 'Position'),
		matches: {
			total: XmlInteger(xml, 'GamesPlayed'),
			won: XmlInteger(xml, 'GamesWon'),
			lost: XmlInteger(xml, 'GamesLost'),
			draw: XmlInteger(xml, 'GamesDraw'),
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
