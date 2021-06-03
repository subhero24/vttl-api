import soap from '../utils/soap.js';
import { XmlNodes, XmlString } from '../utils/xml.js';

// Options can contain the following fields:
// - Season
// - Level
// - ShowDivisionName (yes/no/short)

export default async function divisions(options = {}) {
	let xml = await soap({ GetDivisions: options });
	return XmlNodes(xml, 'DivisionEntries', parseDivision);
}

function parseDivision(xml) {
	return {
		id: XmlString(xml, 'DivisionId'),
		name: XmlString(xml, 'DivisionName'),
		level: XmlString(xml, 'Level'),
		system: XmlString(xml, 'MatchType'),
		category: XmlString(xml, 'DivisionCategory'),
	};
}
