const axios = require("axios").default;
const serverURL = process.env.REACT_APP_SERVER_URL;

export async function LogOn(username: string, password: string) {
	let req: any;

	try {
		const hi = await axios.post(`${serverURL}/api/login`, {
			username,
			password,
		});
		req = hi.data.token;
	} catch (err) {
		const error = err.response.data.message || "Server is down.";
		console.debug(serverURL)
		throw error;
	}

	return req;
}

export async function SignUp(username: string, password: string) {
	try {
		await axios.post(`${serverURL}/api/signup`, {
			username,
			password,
		});
	} catch (err) {
		throw err.response.data.message;
	}
}
