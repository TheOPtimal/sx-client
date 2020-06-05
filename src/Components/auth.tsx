import { logonReturn, signUpReturn } from "./types";
const axios = require("axios").default;

export async function LogOn(username: string, password: string) {
  let req: any;

  try {
    const hi = await axios.post(
      "https://sx-alts-server.herokuapp.com/api/login",
      {
        username,
        password,
      }
    );
    req = hi.data.token;
  } catch (err) {
    console.log(err.response);
    throw err.response.data.message;
  }

  return req;
}

export async function SignUp(username: string, password: string) {
  try {
    await axios.post("https://sx-alts-server.herokuapp.com/api/signup", {
      username,
      password,
    });
  } catch (err) {
    throw err.response.data.message;
  }
}
