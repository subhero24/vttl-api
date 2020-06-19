import request from '../utils/request';

async function seasons() {
	const xml = await request({ GetSeasonsRequest: {} });
	const seasonEntries = xml.querySelectorAll('SeasonEntries') || [];
	return [...seasonEntries].map(parseSeason);
}

function parseSeason(xml) {
	let season = {};
	const id = xml.querySelector('Season');
	const name = xml.querySelector('Name');
	const current = xml.querySelector('IsCurrent');
	if (id != null) season.id = id.textContent;
	if (name != null) season.name = name.textContent;
	if (current != null) season.current = current.textContent === 'true';
	return season;
}

export default seasons;
