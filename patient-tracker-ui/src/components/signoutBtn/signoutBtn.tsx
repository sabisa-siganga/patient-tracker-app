import React from "react";
import "./signoutBtn.scss";
import { useNavigate } from "react-router-dom";

// handle the signout process
const SignoutBtn = () => {
  const navigate = useNavigate();
  const onSignout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the signin page after signing out
    navigate("/");
  };
  return (
    <div className="signout-container">
      {/* sign out button */}
      <button className="btn btn-dark" onClick={onSignout}>
        Sign out
      </button>
    </div>
  );
};

export default SignoutBtn;
