import { prepare } from '../utils/options.js';
import soap from '../utils/soap.js';
import { XmlString, XmlInteger, XmlNode, XmlNodes, XmlDate } from '../utils/xml.js';

// Options can contain the following fields:
// - Season
// - TournamentUniqueIndex
// - WithResults
// - WithRegistrations

export default async function getTournaments(options = {}) {
	let props = prepare(options, [
		['id', 'TournamentUniqueIndex'],
		['results', 'WithResults'],
		['registrations', 'WithRegistrations'],
	]);

	let xml = await soap({ GetTournaments: props });
	let tournaments = XmlNodes(xml, 'TournamentEntries', parseTournament);

	return tournaments;
}

function parseTournament(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		level: XmlInteger(xml, 'Level'),
		venue: XmlNode(xml, 'Venue', parseVenue),
		start: XmlDate(xml, 'DateFrom'),
		finish: XmlDate(xml, 'DateTo'),
		series: XmlNodes(xml, 'SerieEntries', parseSerie),
		deadline: XmlDate(xml, 'RegistrationDate'),
		description: XmlString(xml, 'ExternalIndex'),
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
		count: XmlInteger(xml, 'RegistrationCount'),
		results: XmlNodes(xml, 'ResultEntries', parseResult),
		registrations: XmlNodes(xml, 'RegistrationEntries', parseRegistration),
	};
}

function parseResult(xml) {
	return {
		players: [XmlNode(xml, 'HomePlayer', parsePlayer), XmlNode(xml, 'AwayPlayer', parsePlayer)],
		score: [XmlInteger(xml, 'HomeSetCount'), XmlInteger(xml, 'AwaySetCount')],
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

function parseClub(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		longname: XmlString(xml, 'LongName'),
		province: {
			id: XmlString(xml, 'Category'),
			name: XmlString(xml, 'CategoryName'),
		},
	};
}

function parseRegistration(xml) {
	let player = XmlNode(xml, 'Member', parsePlayer);

	player.club = XmlNode(xml, 'Club', parseClub);

	return {
		id: XmlString(xml, 'UniqueIndex'),
		player,
		timestamp: XmlDate(xml, 'RegistrationDate'),
	};
}
