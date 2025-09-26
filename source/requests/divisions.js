import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlNodes, XmlString } from '../utils/xml.js';

// Options can contain the following fields:
// - Season
// - Level
// - ShowDivisionName (yes/no/short)

export default async function getDivisions(options = {}) {
	let props = prepare(options, [['divisions', 'ShowDivisionName']]);

	let xml = await soap({ GetDivisions: props });
	let divisions = XmlNodes(xml, 'DivisionEntries', parseDivision);
	return divisions;
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
