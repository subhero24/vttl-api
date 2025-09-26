import soap from '../utils/soap.js';

import { prepare } from '../utils/options.js';
import { XmlBoolean, XmlStrings } from '../utils/xml.js';

export default async function uploadData(options = {}) {
	let props = prepare(options);

	let xml = await soap({ UploadRequest: props });
	let upload = parseUpload(xml);

	return upload;
}

function parseUpload(xml) {
	return {
		result: XmlBoolean(xml, 'Result'),
		errors: XmlStrings(xml, 'ErrorLines'),
	};
}
