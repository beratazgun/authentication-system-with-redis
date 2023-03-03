import validator from 'validator'

import { FaPhoneAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { BsFillFilePersonFill } from 'react-icons/bs'

const loginİnputConfig = [
	{
		id: 1,
		tagId: 'email',
		label: 'Email Address',
		type: 'email',
		name: 'email',
		icon: MdOutlineAlternateEmail,
		loginOptions: {
			...{
				required: 'You should enter your email',
			},
		},
	},
	{
		id: 2,
		tagId: 'password',
		label: 'Password',
		type: 'password',
		name: 'password',
		icon: MdPassword,
		loginOptions: {
			...{
				required: 'You should enter your password',
			},
		},
	},
]

export default loginİnputConfig
