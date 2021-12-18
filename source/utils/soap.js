// Not using fetch, because it has no XML parser
// Needs browsers DOMParser to parse XML from fetch

import VttlApiError from '../utils/error.js';
import { XmlString } from '../utils/xml.js';

const url = 'https://api.vttl.be/0.7/index.php?s=vttl';

export default function soap(options) {
	return new Promise((resolve, reject) => {
		let data =
			'<?xml version="1.0" encoding="UTF-8"?>' +
			'<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://api.frenoy.net/TabTAPI">' +
			'<SOAP-ENV:Body>' +
			`${xml(options)}` +
			'</SOAP-ENV:Body>' +
			'</SOAP-ENV:Envelope>';

		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			let xml = xhr.responseXML;
			if (xhr.status === 200) {
				resolve(xml);
			} else {
				let errorCode = XmlString(xml, 'faultcode');
				let errorMessage = XmlString(xml, 'faultstring');

				reject(new VttlApiError(errorMessage, errorCode));
			}
		};
		xhr.onerror = () => {
			reject(xhr.statusText);
		};

		xhr.open('POST', url);
		xhr.send(data);
	});
}

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
