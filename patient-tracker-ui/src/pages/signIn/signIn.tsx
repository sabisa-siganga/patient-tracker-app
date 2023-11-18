import React, { useEffect, useState } from "react";
import "./signIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { checkIsLogin } from "../../utils/utils";

// Sign In page
const SignInPage = () => {
  // State to manage username and password input values
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // React Router hook for navigation
  const navigate = useNavigate();

  // useEffect hook to check if the user is already logged in
  useEffect(() => {
    // Checking if the user is logged in
    const info = checkIsLogin();

    // Redirecting to the appropriate page based on the user's role
    if (info.loggedIn) {
      navigate(info.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [navigate]);

  // handle the login process
  const onLogin = async (event: React.FormEvent) => {
    try {
      // Preventing the default form submission behavior
      event.preventDefault();

      // Sending a POST request to the server for user authentication
      const response = await fetch("/signin", {
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

      // Check for errors in the response and display an alert
      if (results.error) {
        return alert(results.error);
      }

      // Storing the received token and user information in local storage
      localStorage.setItem("Token", results.token);
      localStorage.setItem("User", JSON.stringify(results.user));

      // Redirecting to the appropriate page based on the user's role
      if (results.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  return (
    <div className="sign-in-container py-5">
      {/* Sign-in heading */}
      <h2 className="pb-5">Sign in</h2>

      {/* Sign-in form */}
      <div className="sign-in-form">
        <form onSubmit={onLogin}>
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

          <div className="sign-btn-container mb-5">
            {/* Sign-in button */}
            <button className="btn sign-btn" type="submit">
              Sign in
            </button>
          </div>

          {/* Link to the registration page for users without an account */}
          <div className="no-account pb-5">
            <p>Don't have an account?</p>
            <Link className="register" to="/register">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
