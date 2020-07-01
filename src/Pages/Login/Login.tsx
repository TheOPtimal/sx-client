import React, { useState, useEffect } from "react";
import "./Login.scss";
import { LogOn, SignUp } from "../../Components/nonReactive/auth";

function verifyCredentials(
  username: string,
  passStrongEnough: boolean
): boolean {
  if (!(username.search(/.+#[0-9]{4}/g) > -1)) {
    alert("Invalid discord username");
    return false;
  }
  if (!passStrongEnough) {
    alert("Password is not strong enough");
    return false;
  }

  return true;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginType, setLoginType] = useState<"login" | "signup">("login");
  const [passStrongEnough, setPassStrongEnough] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formName, setFormName] = useState<"Log In" | "Sign Up">("Log In");

  useEffect(() => {
    if (localStorage.getItem("token")) window.open("/dashboard", "_self");
  });

  return (
    <div className="Login">
      <form
        className="LoginForm"
        onSubmit={function LogMeIn(event) {
          event.preventDefault();

          if (!verifyCredentials(username, passStrongEnough)) return;

          if (loginType === "login") {
            LogOn(username, password).then((token) => {
              localStorage.setItem('token', token)
            }).catch(err => {
              alert(err)
            })
          } else if (loginType === "signup") {
            SignUp(username, password)
              .then(() => {
                alert("Click log in to log into your new account!");
                return;
              })
              .catch((err) => {
                alert(err);
              });
          }
        }}
      >
        <h1>{loginType === "login" ? "Log In" : "Sign Up"}</h1>
        <input
          type="text"
          placeholder="Discord Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="password"
        />
        <span
          onMouseEnter={() => setShowPassword(true)}
          onMouseLeave={() => setShowPassword(false)}
          className="showHide"
        >
          {showPassword ? "👁" : "🙈"}
        </span>
        <PasswordStrength
          password={password}
          setPassStrongEnough={setPassStrongEnough}
        />
        <button
          type="submit"
          onMouseEnter={() => setFormName("Log In")}
          onClick={() => setLoginType("login")}
        >
          Log in
        </button>
        <button
          type="submit"
          onMouseEnter={() => setFormName("Sign Up")}
          onClick={() => setLoginType("signup")}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

function PasswordStrength({
  password,
  setPassStrongEnough,
}: {
  password: string;
  setPassStrongEnough: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let validations = [
    password.length >= 8,
    password.search(/[A-Z]/) > -1,
    password.search(/[0-9]/) > -1,
    password.search(/[$&+,:;=?@#*]/) > -1,
  ];

  let strength: number = (validations.reduce as any)(
    (acc, cur) => acc + (cur ? 1 : 0)
  );

  useEffect(() => {
    if (strength === 4) setPassStrongEnough(true);
    else setPassStrongEnough(false);
  });

  return (
    <div className="passwordValidation">
      <div className="strength">
        <span className={`bar bar-1 ${strength >= 1 ? "bar-show" : ""}`}></span>
        <span className={`bar bar-2 ${strength >= 2 ? "bar-show" : ""}`}></span>
        <span className={`bar bar-3 ${strength >= 3 ? "bar-show" : ""}`}></span>
        <span className={`bar bar-4 ${strength >= 4 ? "bar-show" : ""}`}></span>
      </div>
      <ul>
        <li>{validations[0] ? "✔" : "❌"} must be at least 8 characters</li>
        <li>{validations[1] ? "✔" : "❌"} must contain a capital letter</li>
        <li>{validations[2] ? "✔" : "❌"} must contain a number</li>
        <li>{validations[3] ? "✔" : "❌"} must contain one of $&+,:;=?@#*</li>
      </ul>
    </div>
  );
}
