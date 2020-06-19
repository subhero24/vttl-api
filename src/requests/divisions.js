import request from '../utils/request';
import { XmlNodes, XmlString } from '../utils/xml-types';

// Options can contain the following fields:
// - Season
// - Level
// - ShowDivisionName (yes/no/short)

export default async function divisions(options = {}) {
	let xml = await request({ GetDivisions: options });
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
