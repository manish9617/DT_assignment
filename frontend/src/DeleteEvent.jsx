import React, { useState } from "react";
import axios from "axios";

const DeleteEvent = () => {
  const [eventId, setEventId] = useState("");

  const deleteEvent = async () => {
    try {
      if (!eventId) {
        alert("Event ID is required to delete");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/api/v3/app/events/${eventId}`
      );
      alert(response.data.message);
      setEventId("");
    } catch (error) {
      console.error(error);
      alert("Error deleting event");
    }
  };

  return (
    <div>
      <h2>Delete Event</h2>
      <input
        type="text"
        placeholder="Enter Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
};

export default DeleteEvent;
