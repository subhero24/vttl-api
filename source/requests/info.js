import soap from '../utils/soap.js';
import { XmlInteger, XmlString } from '../utils/xml.js';

export default async function info(options = {}) {
	let xml = await soap({ TestRequest: options });
	return parseInfo(xml);
}

function parseInfo(xml) {
	return {
		ip: XmlString(xml, 'RequestorIp'),
		ticks: XmlInteger(xml, 'ConsumedTicks'),
		quota: {
			current: XmlInteger(xml, 'CurrentQuota'),
			allowed: XmlInteger(xml, 'AllowedQuota'),
		},
		version: XmlString(xml, 'ApiVersion'),
		lanugage: XmlString(xml, 'Language'),
		database: XmlString(xml, 'Database'),
	};
}
