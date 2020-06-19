import request from '../utils/request';

/**
 * @typedef {Object} Venue
 * @property {string} id
 * @property {string} [name]
 * @property {string} [street]
 * @property {string} [town]
 * @property {string} [phone]
 * @property {string} [comment]
 */

/**
 * @typedef {Object} Club
 * @property {string} id
 * @property {string} [name]
 * @property {string} [longname]
 * @property {string} [province]
 * @property {Array<Venue>} [venues]
 */

/**
 * @param {Object} [options]
 * @param {string} [options.Club]
 * @param {string} [options.Season]
 * @param {string|number} [options.ClubCategory]
 * @returns {Promise<Array<Club>>}
 */
async function clubs(options = {}) {
	// Options can contain the following fields:
	// - Season
	// - ClubCategory
	// - Club
	const xml = await request({ GetClubs: options });
	const clubEntries = xml.querySelectorAll('ClubEntries') || [];
	return [...clubEntries].map(parseClub);
}

/**
 * @returns {Club}
 */
function parseClub(xml) {
	let club = {};

	const id = xml.querySelector('UniqueIndex');
	const name = xml.querySelector('Name');
	const venues = xml.querySelectorAll('VenueEntries');
	const longname = xml.querySelector('LongName');
	const province = xml.querySelector('Category');

	if (id != null) club.id = id.textContent;
	if (name != null) club.name = name.textContent;
	if (venues != null && venues.length > 0) club.venues = [...venues].map(parseVenue);
	if (longname != null) club.longname = longname.textContent;
	if (province != null) club.province = province.textContent;

	return club;
}

/**
 * @returns {Venue}
 */
function parseVenue(xml) {
	let venue = {};

	const id = xml.querySelector('ClubVenue');
	const name = xml.querySelector('Name');
	const street = xml.querySelector('Street');
	const town = xml.querySelector('Town');
	const phone = xml.querySelector('Phone');
	const comment = xml.querySelector('Comment');

	if (id != null) venue.id = id.textContent;
	if (name != null && name.textContent !== '') venue.name = name.textContent;
	if (street != null && street.textContent !== '') venue.street = street.textContent;
	if (town != null && town.textContent !== '') venue.town = town.textContent;
	if (phone != null && phone.textContent !== '') venue.phone = phone.textContent;
	if (comment != null && comment.textContent !== '') venue.comment = comment.textContent;

	return venue;
}

export default clubs;
