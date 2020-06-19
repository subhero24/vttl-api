import request from '../utils/request';

// Options can contain the following fields:
// - Club
// - Season
// - PlayerCategory
// - UniqueIndex
// - NameSearch
// - RankingPointsInformation
// - WithResults

async function members(options = {}) {
	const xml = await request({ GetMembersRequest: options });
	const memberEntries = xml.querySelectorAll('MemberEntries') || [];
	return [...memberEntries].map(parseMember);
}

function parseMember(xml) {
	let member = {};
	const id = xml.querySelector('UniqueIndex');
	const index = xml.querySelector('RankingIndex');
	const position = xml.querySelector('Position');
	const firstname = xml.querySelector('FirstName');
	const lastname = xml.querySelector('LastName');
	const ranking = xml.querySelector('Ranking');
	const club = xml.querySelector('Club');
	const results = xml.querySelectorAll('ResultEntries');
	const rankings = xml.querySelectorAll('RankingPointsEntries');

	if (id != null) member.id = id.textContent;
	if (index != null) member.index = parseInt(index.textContent, 10);
	if (position != null) member.position = parseInt(position.textContent, 10);
	if (firstname != null) member.firstname = firstname.textContent;
	if (lastname != null) member.lastname = lastname.textContent;
	if (ranking != null) member.ranking = ranking.textContent;
	if (club != null) member.club = club.textContent;
	if (results != null && results.length > 0) member.results = [...results].map(parseResult);
	if (ranking != null && rankings.length > 0) member.rankings = [...rankings].map(parseRanking);

	return member;
}

function parseResult(xml) {
	let result = {};
	const id = xml.querySelector('UniqueIndex');
	const date = xml.querySelector('Date');
	const firstname = xml.querySelector('FirstName');
	const lastname = xml.querySelector('LastName');
	const ranking = xml.querySelector('Ranking');
	const score = xml.querySelector('Result');

	if (id != null) result.id = id.textContent;
	if (date != null) result.date = date.textContent;
	if (firstname != null) result.firstname = firstname.textContent;
	if (lastname != null) result.lastname = lastname.textContent;
	if (ranking != null) result.ranking = ranking.textContent;
	if (score != null) result.score = score.textContent;
	return result;
}

function parseRanking(xml) {
	let ranking = {};
	const value = xml.querySelector('Value');
	const method = xml.querySelector('MethodName');
	const modified = xml.querySelector('LastModified');
	if (value != null) ranking.value = value.textContent;
	if (method != null) ranking.method = method.textContent;
	if (modified != null) ranking.modified = modified.textContent;
	return ranking;
}

export default members;
