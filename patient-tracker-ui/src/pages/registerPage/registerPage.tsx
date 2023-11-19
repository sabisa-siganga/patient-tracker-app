import React, { useEffect, useState } from "react";
import "./registerPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { checkIsLogin } from "../../utils/utils";

const RegisterPage = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  // checking if the user is logged in
  useEffect(() => {
    const info = checkIsLogin();

    if (info.loggedIn) {
      navigate(info.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [navigate]);

  // Handling user resgistration
  const onRegister = async (event: React.FormEvent) => {
    try {
      // preventing onSubmit form  default
      event.preventDefault();

      // Send a post request to create an account
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });

      // Parse the response as JSON
      const results = await response.json();

      // Check for errors in the response and respond with an alert
      if (results.error) {
        return alert(results.error);
      }

      navigate("/");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  return (
    <div className="register-container py-5">
      <h2 className="pb-5">Register account</h2>
      <div className="register-form">
        <form onSubmit={onRegister}>
          {/* input fields */}
          <div className="userField mb-4">
            <label className="mb-1">Username:</label>
            <input
              type="email"
              placeholder="Enter username"
              required
              onChange={(e) => {
                setUsernameValue(e.target.value);
              }}
            />
          </div>
          <div className="userField mb-5">
            <label className="mb-1">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
          </div>

          <div className="regBtn-container mb-5">
            <button className="btn regi-btn" type="submit">
              Register
            </button>
          </div>

          <div className="account-exists pb-5">
            <p>Already have an account?</p>
            <Link className="sign-in" to="/">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
