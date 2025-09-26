import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlString, XmlNodes } from '../utils/xml.js';

// Options can contain the following fields:
// - Club
// - Season

export default async function getTeams(options = {}) {
	let props = prepare(options);

	let xml = await soap({ GetClubTeamsRequest: props });
	let club = { id: options.club, name: XmlString(xml, 'ClubName') };
	let teams = XmlNodes(xml, 'TeamEntries', parseTeam);

	for (let team of teams) {
		team.club = club;
	}

	return teams;
}

function parseTeam(xml) {
	return {
		id: XmlString(xml, 'TeamId'),
		letter: XmlString(xml, 'Team'),
		category: XmlString(xml, 'DivisionCategory'),
		division: {
			id: XmlString(xml, 'DivisionId'),
			name: XmlString(xml, 'DivisionName'),
			system: XmlString(xml, 'MatchType'),
		},
	};
}
