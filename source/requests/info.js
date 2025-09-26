import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlBoolean, XmlInteger, XmlString, XmlDate } from '../utils/xml.js';

export default async function getInfo(options = {}) {
	let props = prepare(options);

	let xml = await soap({ TestRequest: props });
	let info = parseInfo(xml);

	return info;
}

function parseInfo(xml) {
	return {
		ip: XmlString(xml, 'RequestorIp'),
		ticks: XmlInteger(xml, 'ConsumedTicks'),
		account: XmlBoolean(xml, 'IsValidAccount'),
		language: XmlString(xml, 'Language'),
		database: XmlString(xml, 'Database'),
		timestamp: XmlDate(xml, 'Timestamp'),

		quota: {
			current: XmlInteger(xml, 'CurrentQuota'),
			allowed: XmlInteger(xml, 'AllowedQuota'),
		},

		versions: {
			api: XmlString(xml, 'ApiVersion'),
			php: XmlString(xml, 'PhpVersion'),
			database: XmlString(xml, 'DbVersion'),
		},
	};
}
