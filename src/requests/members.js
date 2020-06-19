import request from '../utils/request';
import { XmlNodes, XmlString, XmlInteger } from '../utils/xml-types';

// Options can contain the following fields:
// - Club
// - Season
// - PlayerCategory
// - UniqueIndex
// - NameSearch
// - RankingPointsInformation
// - WithResults

export default async function members(options = {}) {
	let xml = await request({ GetMembersRequest: options });
	return XmlNodes(xml, 'MemberEntries', parseMember);
}

function parseMember(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		elo: XmlInteger(xml, 'RankingPointsEntries Value'),
		club: XmlString(xml, 'Club'),
		index: XmlInteger(xml, 'RankingIndex'),
		status: XmlString(xml, 'Status'),
		ranking: XmlString(xml, 'Ranking'),
		position: XmlInteger(xml, 'Position'),
		lastname: XmlString(xml, 'LastName'),
		firstname: XmlString(xml, 'FirstName'),
		results: XmlNodes(xml, 'ResultEntries', parseResult),
	};
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
