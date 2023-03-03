import axios from 'axios'

const authApi = async (data, method, path) => {
	const response = await axios({
		method: method,
		url: `http://localhost:3000/api/v1/auth/${path}`,
		data: data,
		withCredentials: true,
	})

	return response.data ? response.data : null
}

export default authApi
