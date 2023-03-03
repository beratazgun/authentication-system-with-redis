import axios from 'axios'

const productsApi = async (limit, category) => {
	const response = await axios.get('http://localhost:3000/api/v1/products', {
		params: {
			category: category,
			limit: limit,
		},
		withCredentials: true,
	})

	// !!!ONLY FOR DEMO PURPOSES!!!
	// await pause(1000)

	return response.data.data
}

const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration)
	})
}

export default productsApi
