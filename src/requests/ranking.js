import request from '../utils/request'

// Options can contain the following fields:
// - DivisionId
// - WeekName
// - RankingSystem

async function ranking(options) {
	let xml = await request({ GetDivisionRankingRequest: options })
	let rankingEntry = xml.querySelector('GetDivisionRankingResponse')
	if (rankingEntry != null) {
		return parseRanking(rankingEntry)
	} else {
		return null
	}
}

function parseRanking(xml) {
	let ranking = {}
	const division = xml.querySelector('DivisionName')
	const rankingEntries = xml.querySelectorAll('RankingEntries')
	if (division !== null) ranking.division = division.textContent
	if (rankingEntries != null && rankingEntries.length > 0)
		ranking.entries = [...rankingEntries].map(parseRankingEntry)
	return ranking
}

function parseRankingEntry(xml) {
	let entry = {}
	const points = xml.querySelector('Points')
	const position = xml.querySelector('Position')
	if (points != null) entry.points = points.textContent
	if (position != null) entry.position = position.textContent

	let team = {}
	const name = xml.querySelector('Team')
	const club = xml.querySelector('TeamClub')
	if (name != null) team.name = name.textContent
	if (club != null) team.club = club.textContent
	if (Object.keys(team).length > 0) entry.team = team

	let games = {}
	const gameswon = xml.querySelector('GamesWon')
	const gameslost = xml.querySelector('GamesLost')
	const gamesdraw = xml.querySelector('GamesDraw')
	const gamesplayed = xml.querySelector('GamesPlayed')
	if (gameswon != null) games.won = parseInt(gameswon.textContent, 10)
	if (gameslost != null) games.lost = parseInt(gameslost.textContent, 10)
	if (gamesdraw != null) games.draw = parseInt(gamesdraw.textContent, 10)
	if (gamesplayed != null) games.played = parseInt(gamesplayed.textContent, 10)
	if (Object.keys(games).length > 0) entry.games = games

	let matches = {}
	const matcheswon = xml.querySelector('IndividualMatchesWon')
	const matcheslost = xml.querySelector('IndividualMatchesLost')
	if (matcheswon != null) matches.won = parseInt(matcheswon.textContent, 10)
	if (matcheslost != null) matches.lost = parseInt(matcheslost.textContent, 10)
	if (Object.keys(matches).length > 0) entry.matches = matches

	let sets = {}
	const setswon = xml.querySelector('IndividualSetsWon')
	const setslost = xml.querySelector('IndividualSetsLost')
	if (setswon != null) sets.won = parseInt(setswon.textContent, 10)
	if (setslost != null) sets.lost = parseInt(setslost.textContent, 10)
	if (Object.keys(sets).length > 0) entry.sets = sets

	return entry
}

export default ranking
