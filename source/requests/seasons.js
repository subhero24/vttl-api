import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlNodes, XmlString, XmlBoolean } from '../utils/xml.js';

export default async function getSeasons(options = {}) {
	let props = prepare(options);

	let xml = await soap({ GetSeasonsRequest: props });
	let seasons = XmlNodes(xml, 'SeasonEntries', parseSeason);

	return seasons;
}

function parseSeason(xml) {
	return {
		id: XmlString(xml, 'Season'),
		name: XmlString(xml, 'Name'),
		current: XmlBoolean(xml, 'IsCurrent'),
	};
}
