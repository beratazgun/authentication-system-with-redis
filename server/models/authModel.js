import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const authSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required.'],
		lowercase: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required.'],
		lowercase: true,
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: [true, 'Phone number is required.'],
		trim: true,
		// validate: [
		// 	(val) => validator.isMobilePhone(val),
		// 	'Please enter a valid phone number. Must be 11 characters long.',
		// ],
		// minLength: [11, 'Phone number must be 11 characters long.'],
		// maxlength: [11, 'Phone number must be 11 characters long.'],
		unique: [true, 'This phone number is already registered.'],
	},
	email: {
		type: String,
		required: [true, 'Email is required.'],
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Please enter a valid email address.'],
		unique: [true, 'This email is already registered.'],
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
		trim: true,
		validate: [
			validator.isStrongPassword,
			'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.',
		],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Password confirmation is required.'],
		trim: true,
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'passwords do not match',
		},
	},
	role: {
		type: String,
		required: true,
		default: 'user',
	},
	// address: [
	// 	{
	// 		type: mongoose.Schema.ObjectId,
	// 		ref: 'Address',
	// 	},
	// ],
	createdAt: {
		type: Date,
		default: Date.now(),
		default: new Date(Date.now()),
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

authSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, 12);

	this.passwordConfirm = undefined;
	next();
});

// authSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: 'address',
// 		select: '-__v',
// 	});
// 	next();
// });

authSchema.methods.isCorrectPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
