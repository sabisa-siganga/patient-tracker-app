import React from "react";
import "./card.scss";
import { DateTime } from "luxon";

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
      <p className="mb-2">Consultant: {consultant}</p>
      <p className="mb-2">
        Date & Time: {DateTime.fromISO(dateTime).toFormat("ff")}
      </p>
      <p className="pb-2">Status: {status}</p>
    </div>
  );
};

export default Card;
