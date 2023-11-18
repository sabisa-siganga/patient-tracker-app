/**
 *  Checks if the user is logged in by verifying the presence of a token in local storage.
 */
export const checkIsLogin = () => {
  // returning true if the token exists on the local storage, otherwise false
  if (localStorage.getItem("Token") !== null) {
    // Parsing the user information from local storage
    const user = JSON.parse(localStorage.getItem("User") || "");

    return {
      loggedIn: true,
      role: user.role,
      username: user.username,
    };
  }

  // Returning false if the token is not present
  return {
    loggedIn: false,
  };
};

/**
 * Returning a bearerToken if the user is logged in, otherwise empty string
 */
export const returnBearer = () => {
  // Checking if the user is logged in using the checkIsLogin function
  if (checkIsLogin()) {
    // Returning the bearer token using the stored token from local storage
    return `Bearer ${localStorage.getItem("Token")}`;
  }

  // Returning an empty string if the user is not logged in
  return "";
};
