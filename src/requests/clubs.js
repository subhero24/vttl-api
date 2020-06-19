import request from '../utils/request';
import { XmlNodes, XmlString } from '../utils/xml-types';

// Options can contain the following fields:
// - Season
// - ClubCategory
// - Club

export default async function clubs(options = {}) {
	let xml = await request({ GetClubs: options });
	return XmlNodes(xml, 'ClubEntries', parseClub);
}

function parseClub(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		venues: XmlNodes(xml, 'VenueEntries', parseVenue),
		longname: XmlString(xml, 'LongName'),
		category: {
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
		street: XmlString(xml, 'Street'),
		phone: XmlString(xml, 'Phone'),
		comment: XmlString(xml, 'Comment'),
	};
}
