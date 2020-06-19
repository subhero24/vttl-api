export function XmlNode(xml, name, func) {
	let value = xml.querySelector(name);
	if (value == undefined) return;
	return func(value);
}

export function XmlNodes(xml, name, func) {
	let values = xml.querySelectorAll(name);
	if (values == undefined) return [];
	return [...values].map(func);
}

export function XmlString(xml, name, func) {
	let value = XmlNode(xml, name, function (node) {
		return node.textContent;
	});
	if (value == undefined) return;
	return func ? func(value) : value;
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

export function XmlBoolean(xml, name, func) {
	let value = XmlString(xml, name, function (string) {
		return string === 'true';
	});
	if (value == undefined) return;
	return func ? func(value) : value;
}
