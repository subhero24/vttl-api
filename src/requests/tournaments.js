import request from '../utils/request'

// Options can contain the following fields:
// - Season

async function tournaments(options = {}) {
	const xml = await request({ GetTournaments: options })
	const tournamentEntries = xml.querySelectorAll('TournamentEntries') || []
	return [...tournamentEntries].map(parseTournament)
}

function parseTournament(xml) {
	let tournament = {}
	const id = xml.querySelector('UniqueIndex')
	const name = xml.querySelector('Name')
	const description = xml.querySelector('ExternalIndex')
	if (id != null) tournament.id = id.textContent
	if (name != null) tournament.name = name.textContent
	if (description != null) tournament.description = description.textContent
	return tournament
}

export default tournaments
