import soap from '../utils/soap.js';
import { XmlNodes, XmlString, XmlBoolean } from '../utils/xml.js';

export default async function seasons() {
	let xml = await soap({ GetSeasonsRequest: {} });
	return XmlNodes(xml, 'SeasonEntries', parseSeason);
}

function parseSeason(xml) {
	return {
		id: XmlString(xml, 'Season'),
		name: XmlString(xml, 'Name'),
		current: XmlBoolean(xml, 'IsCurrent'),
	};
}
