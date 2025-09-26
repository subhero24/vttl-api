const regex = /([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\[(\d*)\])?(?:\.|$)/gy;

export function getKey(object, key) {
	let value = object;
	let matches = [...key.matchAll(regex)];
	for (let match of matches) {
		let [attribute, index] = match.slice(1);

		if (index) {
			value = value[attribute][index];
		} else {
			value = value[attribute];
		}

		if (value == undefined) return;
	}

	return value;
}

export function setKey(object, key, value) {
	let root = object;
	let matches = [...key.matchAll(regex)];

	let i, j;
	for (i = 0; i < matches.length - 1; i++) {
		let [attribute, index] = matches[i].slice(1);

		if (root[attribute] == undefined) {
			root[attribute] = index == undefined ? {} : [];
		}

		root = root[attribute];

		if (index === '') {
			let length = root.length;
			if (length === 0) {
				root = root[length] = {};
			} else {
				let next = root[length - 1];

				if (typeof next !== 'object') {
					root = root[length] = {};
				} else {
					for (j = i + 1; j < matches.length; j++) {
						let [attribute, index] = matches[j].slice(1);

						if (index == undefined) {
							next = next[attribute];
						} else if (index !== '') {
							next = next[attribute][index];
						} else {
							break;
						}

						if (next == undefined) break;
					}

					if (next !== undefined && j === matches.length) {
						root = root[length] = {};
					} else {
						root = root[length - 1];
					}
				}
			}
		} else if (index) {
			if (root[index] == undefined) {
				root[index] = {};
			}

			root = root[index];
		}
	}

	let [attribute, index] = matches[i].slice(1);

	if (index == undefined) {
		root[attribute] = value;
	} else {
		if (root[attribute] == undefined) {
			root[attribute] = [];
		}

		if (index === '') {
			root[attribute].push(value);
		} else {
			root[attribute][index] = value;
		}
	}
}

export function entriesToObject(entries = []) {
	let object = {};
	for (let [key, value] of entries) {
		setKey(object, key, value);
	}
	return object;
}

export function objectToEntries(object, prefix = '') {
	let result = [];
	for (let [key, value] of Object.entries(object)) {
		let prefixedKey = `${prefix}${key}`;

		if (typeof value !== 'object') {
			result.push([prefixedKey, value]);
		} else {
			if (value instanceof Array) {
				value.forEach((value, index) => {
					if (typeof value !== 'object') {
						result.push([`${prefixedKey}[${index}]`, value]);
					} else {
						result.push(...objectToEntries(value, `${prefixedKey}[${index}].`));
					}
				});
			} else {
				result.push(...objectToEntries(value, `${prefixedKey}.`));
			}
		}
	}
	return result;
}
