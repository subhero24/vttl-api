import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlNodes, XmlString, XmlInteger, XmlDate, XmlBoolean, XmlNode } from '../utils/xml.js';

// Options can contain the following fields:
// - Club
// - Season
// - PlayerCategory
// - UniqueIndex
// - NameSearch
// - RankingPointsInformation
// - WithResults

const pointTypes = {
	'ELO': 'elo',
	'BEL/pts': 'points',
	'BEL/pos': 'position',
};

export default async function players(options = {}) {
	let props = prepare(options, [
		['id', 'UniqueIndex'],
		['search', 'NameSearch'],
		['points', 'RankingPointsInformation'],
		['results', 'WithResults'],
		['details', 'ExtendedInformation'],
		['category', 'PlayerCategory'],
		['opponents', 'WithOpponentRankingEvaluation'],
	]);

	let xml = await soap({ GetMembersRequest: props });
	let members = XmlNodes(xml, 'MemberEntries', parseMember);
	return members;
}

export function parseMember(xml) {
	let result = {
		id: XmlString(xml, 'UniqueIndex'),
		club: XmlString(xml, 'Club'),
		index: XmlInteger(xml, 'RankingIndex'),
		email: XmlString(xml, 'Email'),
		phone: XmlNode(xml, 'Phone', parsePhone),
		status: XmlString(xml, 'Status'),
		gender: XmlString(xml, 'Gender'),
		points: XmlNodes(xml, 'RankingPointsEntries', parseRankingPoints),
		results: XmlNodes(xml, 'ResultEntries', parseResult),
		address: XmlNode(xml, 'Address', parseAddress),
		ranking: XmlString(xml, 'Ranking'),
		rankings: {},
		position: XmlInteger(xml, 'Position'),
		category: XmlString(xml, 'Category'),
		lastname: XmlString(xml, 'LastName'),
		firstname: XmlString(xml, 'FirstName'),
		birthdate: XmlDate(xml, 'BirthDate'),
		attestation: XmlBoolean(xml, 'MedicalAttestation'),
		nationality: XmlString(xml, 'Nationality'),
		identification: XmlString(xml, 'NationalNumber'),
	};

	for (let point of result.points) {
		result.rankings[pointTypes[point.method]] = point.value;
	}

	return result;
}

function parsePhone(xml) {
	return {
		fax: XmlString(xml, 'Fax'),
		home: XmlString(xml, 'Home'),
		work: XmlString(xml, 'Work'),
		mobile: XmlString(xml, 'Mobile'),
	};
}

function parseRankingPoints(xml) {
	return {
		value: XmlInteger(xml, 'Value'),
		method: XmlString(xml, 'MethodName'),
		timestamp: XmlDate(xml, 'LastModified'),
	};
}

function parseResult(xml) {
	return {
		date: XmlDate(xml, 'Date'),
		type: XmlString(xml, 'CompetitionType'),
		team: XmlString(xml, 'TeamName'),
		score: [XmlInteger(xml, 'SetFor'), XmlInteger(xml, 'SetAgainst')],
		match: {
			id: XmlString(xml, 'MatchUniqueId'),
			name: XmlString(xml, 'MatchId'),
		},
		result: XmlString(xml, 'Result'),
		player: {
			id: XmlString(xml, 'UniqueIndex'),
			club: XmlString(xml, 'Club'),
			ranking: XmlString(xml, 'Ranking'),
			lastname: XmlString(xml, 'LastName'),
			firstname: XmlString(xml, 'FirstName'),
		},
		rankings: XmlNodes(xml, 'RankingEvaluationEntries', parseRankingEvaluation),
		category: XmlString(xml, 'RankingEvaluationCategory'),
		tournament: {
			name: XmlString(xml, 'TournamentName'),
			serie: XmlString(xml, 'TournamentSerieName'),
		},
	};
}

function parseRankingEvaluation(xml) {
	return {
		type: XmlString(xml, 'EvaluationType'),
		value: XmlString(xml, 'EvaluationValue'),
	};
}

function parseAddress(xml) {
	return {
		zip: XmlString(xml, 'ZipCode'),
		town: XmlString(xml, 'Town'),
		line1: XmlString(xml, 'Line1'),
		line2: XmlString(xml, 'Line2'),
	};
}
