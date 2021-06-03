import soap from '../utils/soap.js';
import { XmlString, XmlInteger, XmlNode, XmlNodes } from '../utils/xml.js';

// Options can contain the following fields:
// - Season
// - TournamentUniqueIndex
// - WithResults
// - WithRegistrations

export default async function tournaments(options = {}) {
	let xml = await soap({ GetTournaments: options });
	return XmlNodes(xml, 'TournamentEntries', parseTournament);
}

function parseTournament(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		venue: XmlNode(xml, 'Venue', parseVenue),
		series: XmlNodes(xml, 'SerieEntries', parseSerie),
		level: XmlString(xml, 'Level'),
		start: XmlString(xml, 'DateFrom'),
		finish: XmlString(xml, 'DateTo'),
		description: XmlString(xml, 'ExternalIndex'),
		registration: XmlString(xml, 'RegistrationDate'),
	};
}

function parseVenue(xml) {
	return {
		name: XmlString(xml, 'Name'),
		town: XmlString(xml, 'Town'),
		street: XmlString(xml, 'Street'),
	};
}

function parseSerie(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		count: XmlString(xml, 'RegistrationCount'),
		results: XmlNodes(xml, 'ResultEntries', parseResult),
	};
}

function parseResult(xml) {
	return {
		home: {
			sets: XmlInteger(xml, 'HomeSetCount'),
			player: XmlNode(xml, 'HomePlayer', parsePlayer),
		},
		away: {
			sets: XmlInteger(xml, 'AwaySetCount'),
			player: XmlNode(xml, 'AwayPlayer', parsePlayer),
		},
	};
}

function parsePlayer(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		ranking: XmlString(xml, 'Ranking'),
		lastname: XmlString(xml, 'LastName'),
		firstname: XmlString(xml, 'FirstName'),
	};
}
