import request from '../utils/request';
import { XmlNodes, XmlString, XmlBoolean } from '../utils/xml-types';

export default async function seasons() {
	let xml = await request({ GetSeasonsRequest: {} });
	return XmlNodes(xml, 'SeasonEntries', parseSeason);
}

function parseSeason(xml) {
	return {
		id: XmlString(xml, 'Season'),
		name: XmlString(xml, 'Name'),
		current: XmlBoolean(xml, 'IsCurrent'),
	};
}
