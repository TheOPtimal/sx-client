import { signUpReturn } from "./types";
import axios from "axios";

export async function getAlt() {
  const token = localStorage.getItem("token");
  let req: any;

  try {
    const hi = await axios.get("https://sx-alts-server.herokuapp.com/api/alt", {
      headers: {
        token: token
      }
    });
    req = hi.data.alt
  } catch (err) {
    console.log(err)
    req = "";
    throw err.response.data.message
  }

  return req
}
