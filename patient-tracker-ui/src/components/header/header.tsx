import React from "react";
import "./header.scss";
import SignoutBtn from "../signoutBtn/signoutBtn";

interface Props {
  currentUser: string;
}

// Displaying the header section in an admin and user dashboards
const Header = (props: Props) => {
  const { currentUser } = props;
  return (
    <div className="header-container mb-4">
      {/* Text indicating it's the admin or user dashboard */}
      <p>{currentUser}</p>

      {/* Component for signing out */}
      <SignoutBtn />
    </div>
  );
};

export default Header;
