import { useForm } from 'react-hook-form'
import { RiErrorWarningFill } from 'react-icons/ri'
import { ImSpinner9 } from 'react-icons/Im'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { Link, useNavigate, Navigate, redirect } from 'react-router-dom'
import authApi from '../../services/api/authApi'
import loginİnputConfig from './loginİnputConfig'

const inputStyle = {
	normal:
		'bg-[#f4f4f4] px-4 py-2 text-black rounded-xl focus:outline outline-2 outline-violet-500 w-full',
	error:
		'px-4 py-2 rounded-xl w-full bg-red-100  focus:outline outline-2 outline-red-500',
}

function LoginForm() {
	const navigate = useNavigate()

	const {
		getValues,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const { mutate, isLoading, isError, error, isSuccess } = useMutation({
		mutationFn: () => {
			// return loginUser(getValues())
			return authApi(getValues(), 'POST', 'login')
		},
		onSuccess: () => {
			localStorage.setItem('isLoggedIn', true)
			navigate('/')
		},
	})

	const renderedFields = loginİnputConfig.map((item) => {
		return (
			<div className="flex flex-col gap-1 w-full" key={item.id}>
				<label
					htmlFor={item.name}
					className="text-white text-sm font-semibold px-2">
					{item.label}
				</label>
				<div className="relative flex flex-row items-center gap-1">
					<input
						id={item.tagId}
						type={item.type}
						className={errors[item.name] ? inputStyle.error : inputStyle.normal}
						{...register(item.name, item.loginOptions)}
					/>
				</div>
				<div>
					{errors[item.name] && (
						<p className="text-red-500 text-sm px-2 py-1">
							{errors[item.name].message || errorMessage}
						</p>
					)}
				</div>
			</div>
		)
	})

	return (
		<div>
			<div className="flex flex-col justify-start items-start pb-6">
				<h1 className="text-4xl font-bold text-white">
					Login<span className="text-violet-500">.</span>
				</h1>
				<div>
					<div className="text-white mt-2">
						Don't have an account?
						<Link
							to={'/register'}
							className="text-violet-500 hover:underline-offset-4 hover:underline ml-2">
							Create account
						</Link>
					</div>
				</div>
			</div>
			<form
				onSubmit={handleSubmit((data) => data)}
				className="flex flex-col justify-center items-center h-full gap-3 w-[450px]">
				<div>
					{isError && (
						<p className="text-red-500 text-md px-2 py-1 flex flex-row items-center justify-center gap-2">
							<RiErrorWarningFill className="inline-block text-red-500 text-2xl" />
							{/* {error.response.data.errors.message} */}
						</p>
					)}
				</div>
				{renderedFields}

				<div>
					<button
						onClick={() => mutate()}
						disabled={Object.keys(errors).length > 0}
						type="submit"
						className={
							Object.keys(errors).length > 0
								? 'w-full bg-violet-500 text-white rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg px-24 py-4 duration-300 cursor-no-drop'
								: 'w-full bg-violet-500 text-white rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg px-24 py-4 duration-300'
						}>
						{isLoading ? (
							<ImSpinner9 className="animate-spin text-2xl text-white" />
						) : (
							'Login'
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
