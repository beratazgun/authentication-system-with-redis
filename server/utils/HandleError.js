class HandleError extends Error {
	constructor(message, statusCode, isSuccess) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
		this.isSuccess = isSuccess;

		Error.captureStackTrace(this, this.constructor); // Hataları toplu olarak görmek için bunu kullanıyoruz
	}
}

export default HandleError;
