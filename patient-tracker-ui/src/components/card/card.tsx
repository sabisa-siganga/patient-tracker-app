import React from "react";
import "./card.scss";

// Define the expected props for the Card component
interface Props {
  consultant: string;
  dateTime: string;
  status: string;
}

// Displaying information in a card format
const Card = (props: Props) => {
  // Destructure props to get consultant, dateTime, and status
  const { consultant, dateTime, status } = props;
  return (
    // displaying appointment information
    <div className="card">
      <p className="mb-">Consultant: {consultant}</p>
      <p>Date & Time:{dateTime}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default Card;
