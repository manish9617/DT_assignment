import React, { useState } from "react";
import axios from "axios";

const FetchEventById = () => {
  const [eventId, setEventId] = useState("");
  const [eventData, setEventData] = useState({});

  const fetchEventById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v3/app/events/${eventId}`
      );
      setEventData(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching event by ID");
    }
  };

  return (
    <div>
      <h2>Fetch Event by ID</h2>
      <input
        type="text"
        placeholder="Enter Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <button onClick={fetchEventById}>Fetch Event</button>
      <pre>{JSON.stringify(eventData, null, 2)}</pre>
    </div>
  );
};

export default FetchEventById;
