import lodash from 'lodash';

const handleValidationError = (err, res) => {
	let errObj = {};
	Object.values(err.errors).map((el) => {
		errObj[el.path] = el.message;
	});

	return {
		status: 'fail',
		errObj,
		statusCode: 400,
		isSuccess: false,
	};
};

const handleDuplicateError = (err) => {
	let errObj = {};
	let fieldName = lodash.lowerCase(lodash.keys(err.keyValue)[0]);

	errObj[Object.keys(err.keyValue)[0]] = `this ${fieldName} is already taken`;

	return {
		status: 'fail',
		errObj,
		statusCode: 400,
		isSuccess: false,
	};
};

const errorController = (err, req, res, next) => {
	if (err.name === 'ValidationError') err = handleValidationError(err, res);
	if (err.code === 11000) err = handleDuplicateError(err);

	console.log(err);

	res.status(err.statusCode || 500).json({
		errorMessage: err.message || err.errObj,
		status: err.status,
		isSuccess: err.isSuccess,
		statusCode: err.statusCode,
	});

	next();
};

export default errorController;
