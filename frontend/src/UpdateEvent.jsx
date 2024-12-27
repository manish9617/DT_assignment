import React, { useState } from "react";
import axios from "axios";

const UpdateEvent = () => {
  const [eventId, setEventId] = useState("");
  const [eventData, setEventData] = useState({
    name: "",
    tagline: "",
    schedule: "",
    description: "",
    moderator: "",
    category: "",
    sub_category: "",
    rigor_rank: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isEventFetched, setIsEventFetched] = useState(false);

  // Fetch event by ID
  const fetchEventDetails = async () => {
    if (!eventId) {
      alert("Please enter event ID");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v3/app/events/${eventId}`
      );
      console.log("Fetched Event Details:", response.data);

      const event = response.data;
      if (event) {
        // Update state with fetched event details
        console.log(event);

        setEventData({
          name: event.name || "",
          tagline: event.tagline || "",
          schedule: event.schedule || "",
          description: event.description || "",
          moderator: event.moderator || "",
          category: event.category || "",
          sub_category: event.sub_category || "",
          rigor_rank: event.rigor_rank || "",
          image: event.files ? event.files.image : null,
        });
        setIsEventFetched(true); // Set the flag to true once event is fetched
      } else {
        alert("Event not found. Please check the ID.");
        setIsEventFetched(false);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      alert("Error fetching event details. Please try again.");
      setIsEventFetched(false);
    }
  };

  // Update event details
  const updateEvent = async () => {
    if (!eventId) {
      alert("Please enter an event ID first.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(eventData).forEach((key) => {
        if (key === "image" && imageFile) {
          formData.append("files[image]", imageFile);
        } else {
          formData.append(key, eventData[key]);
        }
      });

      console.log("Updating event with ID:", eventId);
      console.log("Form data being sent:", formData);

      const response = await axios.put(
        `http://localhost:3000/api/v3/app/events/${eventId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Update Event Response:", response.data);

      alert("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error.response || error);
      alert("Error updating event. Please check the console for details.");
    }
  };

  // Handle input changes for event fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Update Event</h2>
      {!isEventFetched ? (
        <div>
          <input
            type="text"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
          <button onClick={fetchEventDetails}>Fetch Event Details</button>
        </div>
      ) : (
        <div>
          <h3>Update Event Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={eventData.name}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            name="tagline"
            placeholder="Tagline"
            value={eventData.tagline}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="datetime-local"
            name="schedule"
            value={eventData.schedule}
            onChange={handleInputChange}
          />
          <br />
          <textarea
            style={{ marginTop: "10px" }}
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            name="moderator"
            placeholder="Moderator"
            value={eventData.moderator}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={eventData.category}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            name="sub_category"
            placeholder="Sub Category"
            value={eventData.sub_category}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="number"
            name="rigor_rank"
            placeholder="Rigor Rank"
            value={eventData.rigor_rank}
            onChange={handleInputChange}
          />
          <br />
          <input type="file" name="image" onChange={handleImageChange} />
          <br />
          <button onClick={updateEvent}>Update Event</button>
        </div>
      )}
    </div>
  );
};

export default UpdateEvent;
