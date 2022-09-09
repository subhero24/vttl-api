import soap from '../utils/soap.js';
import { XmlNodes, XmlString } from '../utils/xml.js';

// Options can contain the following fields:
// - Season: integer
// - UniqueIndex: integer
// - ShortNameSearch: string
// - RankingCategory: integer

export default async function categories(options) {
	let xml = await soap({ GetPlayerCategories: options });
	return XmlNodes(xml, 'PlayerCategoryEntries', parseCategory);
}

function parseCategory(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		ranking: XmlString(xml, 'RankingCategory'),
		shortname: XmlString(xml, 'ShortName'),
	};
}
