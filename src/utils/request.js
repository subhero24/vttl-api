import xml from './xml.js';

// Not using fetch, because it has no XML parser
// Needs browsers DOMParser to parse XML from fetch

function request(options) {
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
			if (xhr.status === 200) {
				resolve(xhr.responseXML);
			}
		};
		xhr.onreadystatechange = () => {
			if (xhr.status === 500) {
				reject(xhr.statusText);
			}
		};
		xhr.onerror = () => {
			reject(xhr.statusText);
		};

		xhr.open('POST', 'https://api.vttl.be/0.7/index.php?s=vttl');
		xhr.send(data);
	});
}

export default request;
