import React, { useState } from "react";
import axios from "axios";

const AllEvents = () => {
  const [eventsList, setEventsList] = useState([]);

  const fetchLatestEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v3/app/events",
        {
          params: { type: "latest", limit: 5, page: 1 },
        }
      );
      setEventsList(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching latest events");
    }
  };

  return (
    <div>
      <h2>All Events</h2>
      <button onClick={fetchLatestEvents}>Fetch Latest Events</button>
      <pre>{JSON.stringify(eventsList, null, 2)}</pre>
    </div>
  );
};

export default AllEvents;
