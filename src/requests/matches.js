import request from '../utils/request'

// Options can contain the following fields:
// - DivisionId
// - Club
// - Team
// - DivisionCategory
// - Season
// - WeekName
// - Level
// - ShowDivisionName (yes/no/short)
// - YearDateFrom (YYYY-MM-DD)
// - YearDateTo (YYYY-MM-DD)
// - WithDetails
// - MatchId
// - MatchUniqueId

async function matches(options = {}) {
	const xml = await request({ GetMatchesRequest: options })
	const matchEntries = xml.querySelectorAll('TeamMatchesEntries') || []
	return [...matchEntries].map(parseMatch)
}

function parseMatch(xml) {
	let match = {}
	const id = xml.querySelector('MatchUniqueId')
	const date = xml.querySelector('Date')
	const time = xml.querySelector('Time')
	const venueEntry = xml.querySelector('VenueEntry')
	const score = xml.querySelector('Score')
	const system = xml.querySelector('MatchDetails MatchSystem')
	const referee = xml.querySelector('MatchDetails Referee')
	const division = xml.querySelector('DivisionName')
	const divisionCategory = xml.querySelector('DivisionCategory')
	const description = xml.querySelector('MatchId')
	const isValidated = xml.querySelector('IsValidated')
	const isLocked = xml.querySelector('IsLocked')
	const commissioner = xml.querySelector('MatchDetails HallCommissioner')
	const gameEntries = xml.querySelectorAll('MatchDetails IndividualMatchResults')

	if (id != null) match.id = id.textContent
	if (date != null) match.date = date.textContent
	if (time != null) match.time = time.textContent
	if (venueEntry != null) match.venue = parseVenue(venueEntry)
	if (score != null) match.score = score.textContent
	if (system != null) match.system = system.textContent
	if (referee != null) match.referee = referee.textContent
	if (division != null) match.division = division.textContent
	if (divisionCategory != null) match.divisionCategory = divisionCategory.textContent
	if (description != null) match.description = description.textContent
	if (isValidated != null) match.isValidated = isValidated.textContent === 'true'
	if (isLocked != null) match.isLocked = isLocked.textContent === 'true'
	if (commissioner != null) match.commissioner = commissioner.textContent
	if (gameEntries != null && gameEntries.length > 0) match.games = [...gameEntries].map(parseGame)

	let week = {}
	const name = xml.querySelector('WeekName')
	const next = xml.querySelector('NextWeekName')
	const previous = xml.querySelector('PreviousWeekName')
	if (name != null) week.id = name.textContent
	if (next != null) week.next = next.textContent
	if (previous != null) week.previous = previous.textContent
	if (Object.keys(week).length > 0) match.week = week

	let home = {}
	const club1 = xml.querySelector('HomeClub')
	const team1 = xml.querySelector('HomeTeam')
	const score1 = xml.querySelector('MatchDetails HomeScore')
	const forfeit1 = xml.querySelector('IsHomeForfeited')
	const captain1 = xml.querySelector('MatchDetails HomeCaptain')
	const playerEntries1 = xml.querySelectorAll('MatchDetails HomePlayers Players')
	if (club1 != null) home.club = club1.textContent
	if (team1 != null) home.team = team1.textContent
	if (score1 != null) home.score = parseInt(score1.textContent, 10)
	if (forfeit1 != null) home.forfeit = forfeit1.textContent === 'true'
	if (captain1 != null) home.captain = captain1.textContent
	if (playerEntries1 != null && playerEntries1.length > 0) home.players = [...playerEntries1].map(parsePlayer)
	if (Object.keys(home).length > 0) match.home = home

	let away = {}
	const club2 = xml.querySelector('AwayClub')
	const team2 = xml.querySelector('AwayTeam')
	const score2 = xml.querySelector('MatchDetails AwayScore')
	const forfeit2 = xml.querySelector('IsAwayForfeited')
	const captain2 = xml.querySelector('MatchDetails AwayCaptain')
	const playerEntries2 = xml.querySelectorAll('MatchDetails AwayPlayers Players')
	if (club2 != null) away.club = club2.textContent
	if (team2 != null) away.team = team2.textContent
	if (score2 != null) away.score = parseInt(score2.textContent, 10)
	if (forfeit2 != null) away.forfeit = forfeit2.textContent === 'true'
	if (captain2 != null) away.captain = captain2.textContent
	if (playerEntries2 != null && playerEntries2.length > 0) away.players = [...playerEntries2].map(parsePlayer)
	if (Object.keys(away).length > 0) match.away = away

	return match
}

function parsePlayer(xml) {
	let player = {}
	const id = xml.querySelector('UniqueIndex')
	const position = xml.querySelector('Position')
	const firstname = xml.querySelector('FirstName')
	const lastname = xml.querySelector('LastName')
	const ranking = xml.querySelector('Ranking')
	const victory = xml.querySelector('VictoryCount')

	if (id != null) player.id = id.textContent
	if (position != null) player.position = parseInt(position.textContent, 10)
	if (firstname != null) player.firstname = firstname.textContent
	if (lastname != null) player.lastname = lastname.textContent
	if (ranking != null) player.ranking = ranking.textContent
	if (victory != null) player.victory = parseInt(victory.textContent, 10)
	return player
}

function parseGame(xml) {
	let game = {}
	let home = {}
	let away = {}

	const id1 = xml.querySelector('HomePlayerUniqueIndex')
	const id2 = xml.querySelector('AwayPlayerUniqueIndex')
	const sets1 = xml.querySelector('HomeSetCount')
	const sets2 = xml.querySelector('AwaySetCount')
	const score = xml.querySelector('Scores')
	const position = xml.querySelector('Position')
	const position1 = xml.querySelector('HomePlayerMatchIndex')
	const position2 = xml.querySelector('AwayPlayerMatchIndex')

	if (id1 != null) home.id = id1.textContent
	if (id2 != null) away.id = id2.textContent
	if (sets1 != null) home.sets = parseInt(sets1.textContent, 10)
	if (sets2 != null) away.sets = parseInt(sets2.textContent, 10)
	if (score != null) game.sets = parseScore(score.textContent)
	if (position != null) game.position = parseInt(position.textContent, 10)
	if (position1 != null) home.position = parseInt(position1.textContent, 10)
	if (position2 != null) away.position = parseInt(position2.textContent, 10)

	if (Object.keys(home).length > 0) game.home = home
	if (Object.keys(away).length > 0) game.away = away

	return game
}

function parseScore(scores) {
	return scores.split(',').map((score) => {
		let points = parseInt(score.split('|')[1], 10)

		let home, away
		if (points < 0 || Object.is(points, -0)) {
			home = Math.abs(points)
			away = Math.max(11, home + 2)
		} else {
			away = parseInt(points, 10)
			home = Math.max(11, away + 2)
		}
		return { home, away }
	})
}

/**
 * @returns {Venue}
 */
function parseVenue(xml) {
	let venue = {}

	const name = xml.querySelector('Name')
	const street = xml.querySelector('Street')
	const town = xml.querySelector('Town')
	const phone = xml.querySelector('Phone')
	const comment = xml.querySelector('Comment')

	if (name != null && name.textContent !== '') venue.name = name.textContent
	if (street != null && street.textContent !== '') venue.street = street.textContent
	if (town != null && town.textContent !== '') venue.town = town.textContent
	if (phone != null && phone.textContent !== '') venue.phone = phone.textContent
	if (comment != null && comment.textContent !== '') venue.comment = comment.textContent

	return venue
}

export default matches
