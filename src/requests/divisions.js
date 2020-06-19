import request from '../utils/request';

/**
 * @typedef {Object} Division
 * @property {string} id
 * @property {string} [name]
 * @property {number} [level]
 * @property {string} [system]
 * @property {number} [categoryId]
 */

/**
 * @param {Object} [options]
 * @param {string} [options.Season]
 * @param {string} [options.Level]
 * @param {"short"|"yes"|"no"} [options.ShowDivisionName]
 * @returns {Promise<Array<Division>>}
 */
async function divisions(options = {}) {
	// Options can contain the following fields:
	// - Season
	// - Level
	// - ShowDivisionName (yes/no/short)
	const xml = await request({ GetDivisions: options });
	const divisionEntries = xml.querySelectorAll('DivisionEntries') || [];
	return [...divisionEntries].map(parseDivision);
}

/**
 * @returns {Division}
 */
function parseDivision(xml) {
	let division = {};

	const id = xml.querySelector('DivisionId');
	const name = xml.querySelector('DivisionName');
	const level = xml.querySelector('Level');
	const system = xml.querySelector('MatchType');
	const categoryId = xml.querySelector('DivisionCategory');

	if (id != null) division.id = id.textContent;
	if (name != null) division.name = name.textContent;
	if (level != null) division.level = level.textContent;
	if (system != null) division.system = system.textContent;
	if (categoryId != null) division.category = parseInt(categoryId.textContent, 10);

	return division;
}

export default divisions;
