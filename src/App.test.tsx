import React from "react";
import { render } from "@testing-library/react";
import Login from "./Pages/Login/Login";

test("renders login page", () => {
	render(<Login />);
});
