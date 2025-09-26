import { capitalize } from './string.js';
import { objectToEntries, entriesToObject } from './object.js';

export function prepare(options, mappings = []) {
	let allMappings = [
		['authentication', 'Credentials'],
		['authentication.imitate', 'Credentials.OnBehalfOf'],
		['authentication.username', 'Credentials.Account'],
		...mappings,
	];

	let entries = objectToEntries(options);
	let entriesTransformed = entries.map(entry => {
		let optionKey = entry[0];

		let resultKey;
		let resultValue = entry[1];

		for (let [mapKey, mapValue] of allMappings) {
			if (optionKey === mapKey) {
				resultKey = mapValue;
			} else if (resultKey == undefined) {
				let subKey = optionKey.startsWith(mapKey + '.');
				if (subKey) {
					resultKey = mapValue + '.' + optionKey.slice(mapKey.length + 1);
				}
			}
		}

		if (resultKey == undefined) {
			resultKey = optionKey;
		}

		return [resultKey.split('.').map(capitalize).join('.'), resultValue];
	});

	return entriesToObject(entriesTransformed);
}
