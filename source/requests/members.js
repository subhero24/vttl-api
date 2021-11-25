import soap from '../utils/soap.js';
import { XmlNodes, XmlString, XmlInteger } from '../utils/xml.js';

// Options can contain the following fields:
// - Club
// - Season
// - PlayerCategory
// - UniqueIndex
// - NameSearch
// - RankingPointsInformation
// - WithResults

export default async function members(options = {}) {
	let xml = await soap({ GetMembersRequest: options });
	return XmlNodes(xml, 'MemberEntries', parseMember);
}

let rankingMap = {
	'ELO': 'elo',
	'BEL/pts': 'points',
	'BEL/pos': 'position',
};

function parseMember(xml) {
	let result = {
		id: XmlString(xml, 'UniqueIndex'),
		club: XmlString(xml, 'Club'),
		index: XmlInteger(xml, 'RankingIndex'),
		status: XmlString(xml, 'Status'),
		ranking: XmlString(xml, 'Ranking'),
		position: XmlInteger(xml, 'Position'),
		lastname: XmlString(xml, 'LastName'),
		firstname: XmlString(xml, 'FirstName'),
		results: XmlNodes(xml, 'ResultEntries', parseResult),
	};

	for (let rankingPointsEntry of XmlNodes(xml, 'RankingPointsEntries')) {
		let value = XmlInteger(rankingPointsEntry, 'Value');
		let method = XmlString(rankingPointsEntry, 'MethodName');

		result[rankingMap[method]] = value;
	}

	return result;
}

function parseResult(xml) {
	return {
		date: XmlString(xml, 'Date'),
		type: XmlString(xml, 'CompetitionType'),
		sets: [XmlInteger(xml, 'SetFor'), XmlInteger(xml, 'SetAgainst')],
		result: XmlString(xml, 'Result'),
		player: {
			id: XmlString(xml, 'UniqueIndex'),
			club: XmlString(xml, 'Club'),
			ranking: XmlString(xml, 'Ranking'),
			lastname: XmlString(xml, 'LastName'),
			firstname: XmlString(xml, 'FirstName'),
		},
		match: {
			name: XmlString(xml, 'MatchId'),
		},
		tournament: {
			name: XmlString(xml, 'TournamentName'),
			serie: XmlString(xml, 'TournamentSerieName'),
		},
	};
}
