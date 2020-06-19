function xml(object, namespace = 'ns1') {
	let string = '';
	for (let prop in object) {
		if (!Object.prototype.hasOwnProperty.call(object, prop)) continue;

		let value = object[prop];
		let substring = typeof value === 'object' ? xml(value) : value;
		string = `${string}<${namespace}:${prop}>${substring}</${namespace}:${prop}>`;
	}
	return string;
}

export default xml;
