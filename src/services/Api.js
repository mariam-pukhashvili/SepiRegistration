import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

axios.interceptors.request.use(
	(config) => {
		config.baseURL = API_BASE_URL;

		const token = localStorage.getItem("token");

		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export const loginUser = async (credentials) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/login`, {
			email: credentials.email,
			password: credentials.password,
		});
		if (response?.data?.accessToken) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const registerUser = async (user) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/register`, user);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const addToFavourites = async (data) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/favourites`, data);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

// export const getClothes = async () => {
// 	try {
// 		const response = await axios(
// 			"https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
// 		);

// 		return response.data.drinks;
// 	} catch (error) {
// 		throw new Error(error.response);
// 	}
// };

export const getClothes = async () => {
	try {
		const result = await axios.get(`https://api.escuelajs.co/api/v1/products`);
		return result.data;
	} catch (error) {
		console.log("myerror", error);
	}
};
export const getUsers = async () => {
	try {
		const response = await axios(`${API_BASE_URL}/users`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const getMovies = async () => {
	try {
		const response = await axios(`${API_BASE_URL}/movies`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const getCoctails = async () => {
	try {
		const response = await axios(`${API_BASE_URL}/drinks`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const getFavourites = async () => {
	try {
		const response = await axios(`${API_BASE_URL}/favourites`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const deleteFromFavourites = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/favourites/${id}`);

		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const updateDrinks = async (id) => {
	try {
		//const response = await axios.delete(`${API_BASE_URL}/favourites/${id}`);
		const response = await axios.patch(`${API_BASE_URL}/drinks/${id}`, {
			forfavourite: true,
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data);
	}
};
