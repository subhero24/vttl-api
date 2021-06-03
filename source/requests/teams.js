import soap from '../utils/soap.js';
import { XmlString, XmlNodes } from '../utils/xml.js';

// Options can contain the following fields:
// - Club
// - Season

export default async function teams(options = {}) {
	let xml = await soap({ GetClubTeamsRequest: options });
	return XmlNodes(xml, 'TeamEntries', parseTeam);
}

function parseTeam(xml) {
	return {
		id: XmlString(xml, 'TeamId'),
		letter: XmlString(xml, 'Team'),
		system: XmlString(xml, 'MatchType'),
		division: {
			id: XmlString(xml, 'DivisionId'),
			name: XmlString(xml, 'DivisionName'),
			category: XmlString(xml, 'DivisionCategory'),
		},
	};
}
