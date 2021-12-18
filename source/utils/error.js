export default class VttlApiError extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}
