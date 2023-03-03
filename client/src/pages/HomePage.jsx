import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import authApi from '../services/api/authApi.js'

import '../index.css'

function HomePage() {
	const [user, setUser] = useState(null)
	// const [isSuccess, setIsSuccess] = useState(false)

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['getMe'],
		queryFn: () => {
			return authApi({}, 'GET', 'getMe')
		},
		onSuccess: (res) => {
			setUser(res.data)
		},
	})

	const logout = () => {
		authApi({}, 'POST', 'logout')
		setUser(null)
		// window.location.reload(true)
	}

	return (
		<div className="App">
			<div className="flex flex-row justify-center items-centster gap-4">
				<Link to={user ? '/' : '/login'}>
					<button>{user ? 'Dashboard' : 'Login'}</button>
				</Link>
				<Link to={user ? '/' : '/register'}>
					<button
						onClick={() => {
							user && logout()
						}}>
						{user ? 'Logout' : 'Register'}
					</button>
				</Link>
			</div>
			<div className="flex flex-col justify-center items-center gap-4 mt-4">
				{isSuccess && (
					<div className="text-lg flex flex-col gap-2">
						<span>{user?.firstName}</span>
						<span>{user?.lastName}</span>
						<span>{user?.email}</span>
						<span>{user?.phoneNumber}</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default HomePage
