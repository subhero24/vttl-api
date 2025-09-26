import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlInteger, XmlNodes, XmlString } from '../utils/xml.js';

// Options can contain the following fields:
// - Season
// - ClubCategory
// - Club

export default async function getClubs(options = {}) {
	let props = prepare(options, [['province', 'ClubCategory']]);

	let xml = await soap({ GetClubs: props });
	let clubs = XmlNodes(xml, 'ClubEntries', parseClub);
	return clubs;
}

function parseClub(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		venues: XmlNodes(xml, 'VenueEntries', parseVenue),
		longname: XmlString(xml, 'LongName'),
		province: {
			id: XmlString(xml, 'Category'),
			name: XmlString(xml, 'CategoryName'),
		},
	};
}

function parseVenue(xml) {
	return {
		id: XmlString(xml, 'ClubVenue'),
		name: XmlString(xml, 'Name'),
		town: XmlString(xml, 'Town'),
		phone: XmlString(xml, 'Phone'),
		street: XmlString(xml, 'Street'),
		comment: XmlString(xml, 'Comment'),
		position: XmlInteger(xml, 'ClubVenue'),
	};
}
