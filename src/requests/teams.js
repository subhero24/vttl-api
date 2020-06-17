import request from '../utils/request'

// Options can contain the following fields:
// - Club
// - Season

async function teams(options = {}) {
	const xml = await request({ GetClubTeamsRequest: options })
	const teamEntries = xml.querySelectorAll('TeamEntries') || []
	return [...teamEntries].map(parseTeam)
}

function parseTeam(xml) {
	let team = {}
	const id1 = xml.querySelector('TeamId')
	const letter = xml.querySelector('Team')
	const system = xml.querySelector('MatchType')
	if (id1 != null) team.id = id1.textContent
	if (letter != null) team.letter = letter.textContent
	if (system != null) team.system = system.textContent

	let division = {}
	const id2 = xml.querySelector('DivisionId')
	const name = xml.querySelector('DivisionName')
	const category = xml.querySelector('DivisionCategory')
	if (id2 != null) division.id = id2.textContent
	if (name != null) division.name = name.textContent
	if (category != null) division.category = category.textContent
	if (Object.keys(division).length > 0) team.division = division

	return team
}

export default teams
