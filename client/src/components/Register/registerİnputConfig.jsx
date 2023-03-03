import validator from 'validator'
import axios from 'axios'

import { FaPhoneAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { BsFillFilePersonFill } from 'react-icons/bs'

const registerİnputConfig = [
	{
		id: 1,
		tagId: 'firstName',
		label: 'FirstName',
		type: 'text',
		name: 'firstName',
		icon: BsFillFilePersonFill,
		registerOptions: {
			...{
				required: "The first name can't be empty",
				pattern: {
					value: /^[a-zA-Z]+$/,
					message: 'First name should only contain letters',
				},
			},
		},
	},
	{
		id: 2,
		tagId: 'lastName',
		label: 'LastName',
		type: 'text',
		name: 'lastName',
		icon: BsFillFilePersonFill,
		registerOptions: {
			...{
				required: "The last name can't be empty",
				pattern: {
					value: /^[a-zA-Z]+$/,
					message: 'Last name should only contain letters',
				},
			},
		},
	},
	{
		id: 3,
		tagId: 'email',
		label: 'Email',
		type: 'email',
		name: 'email',
		icon: MdOutlineAlternateEmail,
		registerOptions: {
			...{
				required: "The email can't be empty",
				validate: {
					isEmail: (value) =>
						validator.isEmail(value) || "That's not a valid email",
					// checkEmail: async (value) => {
					// 	const { data } = await axios.get(
					// 		`http://localhost:3000/api/v1/auth/checkEmail?email=${value}`
					// 	)
					// 	return data.isValid ? 'Bu email adresi zaten kullanılıyor' : null
					// },
				},
			},
		},
	},
	{
		id: 4,
		tagId: 'phoneNumber',
		label: 'Cell Phone',
		type: 'text',
		name: 'phoneNumber',
		icon: FaPhoneAlt,
		registerOptions: {
			...{
				required: "The phone number can't be empty",
				validate: {
					isPhoneNumber: (value) =>
						validator.isMobilePhone(value) ||
						'Please enter a valid phone number',

					// checkPhoneNumber: async (value) => {
					// 	const { data } = await axios.get(
					// 		`http://localhost:3000/api/v1/auth/checkPhoneNumber?phoneNumber=${value}`
					// 	)
					// 	return data.isValid || 'Bu telefon numarası zaten kullanılıyor'
					// },
				},
			},
		},
	},

	{
		id: 5,
		tagId: 'password',
		label: 'Password',
		type: 'password',
		name: 'password',
		icon: MdPassword,
		registerOptions: {
			...{
				required: 'The password can not be empty',
				minLength: {
					value: 8,
					message: 'Your password must be at least 8 characters',
				},
				maxLength: {
					value: 64,
					message: 'Your password must be at most 64 characters',
				},
				validate: {
					isPassword: (value) =>
						validator.isStrongPassword(value) ||
						'Your password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
				},
			},
		},
	},
	{
		id: 6,
		tagId: 'passwordConfirm',
		label: 'Password Confirm',
		type: 'password',
		name: 'passwordConfirm',
		icon: MdPassword,
		registerOptions: {
			...{
				required: "The password confirmation can't be empty",
				validate: {
					isPairedPassword: () => {
						const password = document.querySelector('#password').value
						const passwordConfirm =
							document.querySelector('#passwordConfirm').value
						return password === passwordConfirm || 'Passwords do not match'
					},
				},
			},
		},
	},
]

export default registerİnputConfig
