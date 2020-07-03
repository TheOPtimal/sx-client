import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

export async function getAlt() {
	const token = localStorage.getItem("token");
	let req: any;

	try {
		const hi = await axios.get(`${serverURL}/api/alt`, {
			headers: {
				token: token,
			},
		});
		req = hi.data.alt;
	} catch (err) {
		console.log(err);
		req = "";
		throw err.response.data.message;
	}

	return req;
}
