export function XmlNode(xml, name, func) {
	let value = xml.querySelector(name);
	if (value == undefined) return;
	return func(value);
}

export function XmlNodes(xml, name, func) {
	let values = xml.querySelectorAll(name);
	if (values == undefined) return [];
	return func ? [...values].map(func) : [...values];
}

export function XmlString(xml, name, func) {
	let value = XmlNode(xml, name, function (node) {
		return node.textContent;
	});
	if (value == undefined) return;
	return func ? func(value) : value;
}

export function XmlStrings(xml, name, func) {
	let values = XmlNodes(xml, name, function (node) {
		return node.textContent;
	});
	return func ? [...values].map(func) : [...values];
}

export function XmlInteger(xml, name, func) {
	let value = XmlString(xml, name, function (string) {
		let result = parseInt(string, 10);
		if (!isNaN(result)) {
			return result;
		}
	});
	if (value == undefined) return;
	return func ? func(value) : value;
}

export function XmlIntegers(xml, name, func) {
	let values = XmlStrings(xml, name, function (string) {
		let result = parseInt(string, 10);
		if (!isNaN(result)) {
			return result;
		}
	});
	return func ? [...values].map(func) : [...values];
}

export function XmlBoolean(xml, name, func) {
	let value = XmlString(xml, name, function (string) {
		return string === 'true';
	});
	if (value == undefined) return;
	return func ? func(value) : value;
}

export function XmlDate(xml, name, func) {
	let value = XmlString(xml, name, function (string) {
		let result = new Date(string);
		if (result instanceof Date && result.toString() !== 'Invalid Date') {
			return result;
		}
	});
	if (value == undefined) return;
	return func ? func(value) : value;
}
