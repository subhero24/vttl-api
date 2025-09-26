import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlBoolean, XmlInteger, XmlNodes, XmlString } from '../utils/xml.js';

// Options can contain the following fields:
// - Season
// - UniqueIndex
// - ShortNameSearch
// - RankingCategory

export default async function getCategories(options = {}) {
	let props = prepare(options, [
		['id', 'UniqueIndex'],
		['type', 'RankingCategory'],
		['search', 'ShortNameSearch'],
	]);

	let xml = await soap({ GetPlayerCategories: props });
	let categories = XmlNodes(xml, 'PlayerCategoryEntries', parseCategory);
	return categories;
}

function parseCategory(xml) {
	let groups;
	let filters;

	let group = XmlBoolean(xml, 'IsGroup');
	if (group) {
		groups = XmlString(xml, 'GroupMembers', parseGroupMembers);
	} else {
		filters = {
			loose: {
				sex: XmlString(xml, 'Sex'),
				min: XmlInteger(xml, 'MinimumAge'),
				max: XmlInteger(xml, 'MaximumAge'),
			},
			strict: {
				sex: XmlString(xml, 'StrictSex'),
				min: XmlInteger(xml, 'StrictMinimumAge'),
				max: XmlInteger(xml, 'StrictMaximumAge'),
			},
		};
	}

	return {
		id: XmlString(xml, 'UniqueIndex'),
		type: XmlString(xml, 'RankingCategory'),
		name: XmlString(xml, 'Name'),
		groups,
		filters,
		abbreviation: XmlString(xml, 'ShortName'),
	};
}

function parseGroupMembers(groupMembers) {
	return groupMembers.split(',');
}
